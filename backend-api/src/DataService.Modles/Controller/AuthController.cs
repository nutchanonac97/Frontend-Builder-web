using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Google.Apis.Auth;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;
using TopTechInterBackend.DataService.Modles;          
using TopTechInterBackend.DataService.Modles.Model;    
using TopTechInterBackend.DataService.Modles.Services; 
using TopTechInterBackend.DataService.Modles.DTOs;     

namespace TopTechInterBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ISocialAuthService _socialService;
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService; // ✅ เพิ่ม Service นี้เข้ามา

        // Configuration Constants
        private const string LINE_OA_URL = "https://line.me/R/ti/p/@toptech"; 

        // ✅ Inject IEmailService เข้ามาใน Constructor
        public AuthController(
            ISocialAuthService socialService, 
            IConfiguration config, 
            IHttpClientFactory httpClientFactory, 
            AppDbContext context,
            IEmailService emailService) 
        {
            _socialService = socialService;
            _config = config;
            _httpClient = httpClientFactory.CreateClient(); 
            _context = context;
            _emailService = emailService; // ✅ เก็บค่าไว้ใช้งาน
        }

        // ============================================================
        // 🚀 1. LINE Login Flow (Web Redirect) - ใช้ DB
        // ============================================================

        [HttpGet("get-line-login-link")]
        public async Task<IActionResult> GetLineLoginLink()
        {
            // ✅ ดึง ClientId จาก DB
            var config = await _context.IntegrationConfigs.FirstOrDefaultAsync(x => x.ConfigKey == "LineConfig:ClientId");
            string clientId = config?.ConfigValue ?? _config["LineConfig:ClientId"];

            if (string.IsNullOrEmpty(clientId)) return BadRequest("ไม่พบ Client ID ของ LINE ใน Database");

            // ⚠️ เปลี่ยน localhost เป็น Domain จริงเมื่อขึ้น Production
            string callbackUrl = "http://localhost:5213/api/auth/line-callback"; 
            
            string authUrl = $"https://access.line.me/oauth2/v2.1/authorize?response_type=code" +
                             $"&client_id={clientId}" +
                             $"&redirect_uri={callbackUrl}" +
                             $"&state=random_secure_string" +
                             $"&scope=profile%20openid%20email";

            return Ok(new { url = authUrl });
        }

        [HttpGet("line-callback")]
        public async Task<IActionResult> LineCallback(string code, string state)
        {
            // ✅ ดึง ClientId และ Secret จาก DB
            var dbClientId = await _context.IntegrationConfigs.FirstOrDefaultAsync(x => x.ConfigKey == "LineConfig:ClientId");
            var dbClientSecret = await _context.IntegrationConfigs.FirstOrDefaultAsync(x => x.ConfigKey == "LineConfig:ClientSecret");

            string clientId = dbClientId?.ConfigValue ?? _config["LineConfig:ClientId"];
            string clientSecret = dbClientSecret?.ConfigValue ?? _config["LineConfig:ClientSecret"];

            if (string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(clientSecret)) 
                return BadRequest("Config Error: LINE ClientId or Secret missing in DB");

            string callbackUrl = "http://localhost:5213/api/auth/line-callback"; 

            // 1. แลก Code เป็น Access Token
            var content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_type", "authorization_code"),
                new KeyValuePair<string, string>("code", code),
                new KeyValuePair<string, string>("redirect_uri", callbackUrl),
                new KeyValuePair<string, string>("client_id", clientId),
                new KeyValuePair<string, string>("client_secret", clientSecret)
            });

            var tokenRes = await _httpClient.PostAsync("https://api.line.me/oauth2/v2.1/token", content);
            var jsonString = await tokenRes.Content.ReadAsStringAsync();
            var json = JObject.Parse(jsonString);
            
            if (json["access_token"] == null) return BadRequest($"LINE Error: {jsonString}");

            string accessToken = json["access_token"].ToString();

            // 2. ดึง Profile
            using var reqMsg = new HttpRequestMessage(HttpMethod.Get, "https://api.line.me/v2/profile");
            reqMsg.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            var profileRes = await _httpClient.SendAsync(reqMsg);
            var profileJson = JObject.Parse(await profileRes.Content.ReadAsStringAsync());

            string lineUserId = profileJson["userId"].ToString();
            string displayName = profileJson["displayName"].ToString();
            string pictureUrl = profileJson["pictureUrl"]?.ToString();

            // 3. Save User logic...
            var user = await _context.Users.FirstOrDefaultAsync(u => u.LineUserId == lineUserId);
            if (user == null)
            {
                user = new User
                {
                    Id = Guid.NewGuid(),
                    Username = displayName,
                    LineUserId = lineUserId,
                    ProfilePictureUrl = pictureUrl,
                    Role = "User",
                    CreatedAt = DateTime.UtcNow,
                    LastLoginAt = DateTime.UtcNow
                };
                _context.Users.Add(user);
            }
            else
            {
                user.LastLoginAt = DateTime.UtcNow;
                user.ProfilePictureUrl = pictureUrl;
                _context.Users.Update(user);
            }
            await _context.SaveChangesAsync();

            return Redirect(LINE_OA_URL);
        }

        // ============================================================
        // 🔐 2. Auth Endpoints (JWT / Google / LINE API)
        // ============================================================

        [HttpPost("line-login")]
        public async Task<IActionResult> LineLogin([FromBody] LineLoginRequest request)
        {
            try
            {
                var user = await _socialService.VerifyLineTokenAsync(request.AccessToken);
                var token = GenerateJwtToken(user);
                string lineOAId = _config["LineConfig:LineOAId"] ?? "@toptech";
                string chatUrl = $"https://line.me/R/oaMessage/{lineOAId}/?{Uri.EscapeDataString($"สวัสดีครับคุณ {user.Username} สนใจติดต่อสอบถามบริการ")}";
                return Ok(new AuthResponse { Token = token, Username = user.Username, Role = user.Role, ProfilePicture = user.ProfilePictureUrl, ChatUrl = chatUrl });
            }
            catch (Exception ex) { return Unauthorized(new { message = ex.Message }); }
        }

       [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            try
            {
                // 1. เรียก Service ให้ไปแกะข้อมูลจาก Google
                // (ถ้า Token ผิด มันจะ Error ตั้งแต่บรรทัดนี้)
                var googleProfile = await _socialService.VerifyGoogleTokenAsync(request);

                // =========================================================
                // 👮‍♂️ 2. เช็คสิทธิ์ Admin (จากตาราง AdminWhitelists)
                // =========================================================
                bool isAdmin = await _context.AdminWhitelists
                                     .AnyAsync(x => x.Email == googleProfile.Email);

                string assignedRole = isAdmin ? "Admin" : "User";

                // =========================================================
                // 💾 3. จัดการ User ลง Database (Upsert)
                // =========================================================
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == googleProfile.Email);

                if (user == null)
                {
                    // -- กรณี User ใหม่ --
                    user = new User
                    {
                        Id = Guid.NewGuid(),
                        Username = googleProfile.Name,
                        Email = googleProfile.Email,
                        // FacebookUserId = googleProfile.GoogleUserId, // ⚠️ แนะนำให้เพิ่ม Field GoogleUserId ใน Model User ดีกว่าครับ
                        ProfilePictureUrl = googleProfile.Picture,
                        Role = assignedRole, // ✅ ได้ Role ตามจริง
                        CreatedAt = DateTime.UtcNow,
                        LastLoginAt = DateTime.UtcNow
                    };
                    _context.Users.Add(user);
                }
                else
                {
                    // -- กรณี User เก่า (อัปเดตข้อมูล) --
                    user.ProfilePictureUrl = googleProfile.Picture;
                    user.LastLoginAt = DateTime.UtcNow;
                    
                    // ✅ อัปเดต Role ทุกครั้งที่ Login (เผื่อเพิ่งโดนเพิ่ม/ลดสิทธิ์)
                    user.Role = assignedRole; 
                    
                    _context.Users.Update(user);
                }

                await _context.SaveChangesAsync();

                // 4. สร้าง JWT ส่งกลับบ้าน
                var token = GenerateJwtToken(user);

                return Ok(new AuthResponse 
                { 
                    Token = token, 
                    Username = user.Username, 
                    Role = user.Role, 
                    ProfilePicture = user.ProfilePictureUrl 
                });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Google Login Failed: " + ex.Message });
            }
        }
        // POST: api/auth/logout
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // ถ้ามีการใช้ Cookie ก็สั่งลบตรงนี้ (เผื่อไว้ในอนาคต)
            Response.Cookies.Delete("jwt_token");

            // ในระบบ JWT หน้าที่หลักคือ Frontend ต้องลบ Token ออกจาก LocalStorage
            // Server ทำได้แค่ตอบกลับว่า รับทราบ
            return Ok(new { message = "Logout successful. Please delete token on client side." });
        }
        // ============================================================
        // 📧 3. Contact Form & Email Logic - ใช้ DB ผ่าน Service
        // ============================================================

        [HttpPost("contact-submit")]
        public async Task<IActionResult> SubmitContact([FromBody] ContactRequest request)
        {
            try
            {
                if (request == null || string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Phone))
                {
                    return BadRequest(new { message = "กรุณากรอกชื่อและเบอร์โทรศัพท์" });
                }

                // --- ส่วนที่ 1: บันทึกลง Database (Log) ---
                var newLog = new ContactLog
                {
                    Id = Guid.NewGuid(),
                    Name = request.Name,
                    Email = request.Email,
                    Phone = request.Phone,
                    Message = request.Message,
                    CreatedAt = DateTime.UtcNow
                };
                
                _context.ContactLogs.Add(newLog);
                await _context.SaveChangesAsync();

                // --- ส่วนที่ 2: เตรียมเนื้อหาอีเมล ---
                string subject = $"⚡ ลูกค้าใหม่: {request.Name}";
                string body = $@"
                    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;'>
                        <div style='background-color: #003366; color: white; padding: 20px; text-align: center;'>
                            <h2 style='margin: 0;'>มีลูกค้าติดต่อเข้ามาใหม่</h2>
                        </div>
                        <div style='padding: 20px; background-color: #ffffff;'>
                            <ul style='list-style: none; padding: 0;'>
                                <li style='padding: 8px 0; border-bottom: 1px solid #eee;'>👤 <b>ชื่อ:</b> {request.Name}</li>
                                <li style='padding: 8px 0; border-bottom: 1px solid #eee;'>📞 <b>เบอร์โทร:</b> {request.Phone}</li>
                                <li style='padding: 8px 0; border-bottom: 1px solid #eee;'>📧 <b>อีเมล:</b> {request.Email ?? "-"}</li>
                            </ul>
                            <p style='margin-top: 20px;'><b>ข้อความ:</b><br>{request.Message ?? "-"}</p>
                        </div>
                    </div>
                ";

                // -------------------------------------------------------------
                // ✅ แก้ไขใหม่: ดึง Email ปลายทางจาก Database
                // -------------------------------------------------------------
                var adminEmailConfig = await _context.IntegrationConfigs
                    .AsNoTracking() // เพื่อความเร็ว
                    .FirstOrDefaultAsync(x => x.ConfigKey == "Email:AdminReceiver");

                // ถ้าใน DB ไม่มี ให้ใช้ค่า Default (Hardcode) กันเหนียวไว้
                string toEmail = adminEmailConfig?.ConfigValue ?? "s65122519067@ssru.ac.th";

                var emailDto = new EmailRequest
                {
                    ToEmail = toEmail, // ✅ ใช้ค่าที่ได้จาก DB
                    Subject = subject,
                    Body = body,
                    IsHtml = true
                };

                // ✅ เรียกใช้ Service ส่งเมล
                await _emailService.SendEmailAsync(emailDto);

                return Ok(new { message = "บันทึกข้อมูลและส่งอีเมลสำเร็จ" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error SubmitContact: {ex.Message}");
                return StatusCode(500, new { message = "เกิดข้อผิดพลาดภายในระบบ", error = ex.Message });
            }
        }

        // ============================================================
        // 🔧 Helpers (JWT / Google) - ลบ SendEmail เก่าออกแล้ว
        // ============================================================

        private string GenerateJwtToken(User user)
        {
            var key = Encoding.ASCII.GetBytes(_config["JwtConfig:Secret"] ?? "DefaultSecretKey_1234567890123456");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()), new Claim(ClaimTypes.Name, user.Username ?? ""), new Claim(ClaimTypes.Role, user.Role ?? "User") }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            return new JwtSecurityTokenHandler().WriteToken(new JwtSecurityTokenHandler().CreateToken(tokenDescriptor));
        }

        private async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(string idToken)
        {
             try
            {
                var clientId = _config["GoogleConfig:ClientId"];
                var settings = new GoogleJsonWebSignature.ValidationSettings() { Audience = new List<string>() { clientId } };
                return await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
            }
            catch { return null; }
        }
// 1. เพิ่ม Admin
        [HttpPost("add-admin")]
        public async Task<IActionResult> AddAdmin([FromBody] AddAdminRequest request)
        {
            // ❌ ลบส่วนเช็ค Secret Key ออก
            // var adminSecret = _config["AdminSettings:SecretKey"] ?? "TopTechAdmin2024!";
            // if (request.SecretKey != adminSecret) return Unauthorized(...);

            // ... (โค้ดเช็ค Whitelist และบันทึก DB ทำเหมือนเดิม) ...
             var adminLog = await _context.AdminWhitelists.FirstOrDefaultAsync(w => w.Email == request.Email);

            if (adminLog != null)
            {
                if (adminLog.IsActive) return BadRequest(new { message = "Email นี้เป็น Admin อยู่แล้ว (Active)" });
                adminLog.IsActive = true;
                adminLog.RevokedAt = null; 
                adminLog.AddedAt = DateTime.UtcNow; 
            }
            else
            {
                _context.AdminWhitelists.Add(new AdminWhitelist 
                { 
                    Email = request.Email,
                    IsActive = true,
                    AddedAt = DateTime.UtcNow
                });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user != null) { user.Role = "Admin"; }

            await _context.SaveChangesAsync();
            return Ok(new { message = $"เพิ่มสิทธิ์ Admin ให้ {request.Email} เรียบร้อยแล้ว" });
        }
// 2. ลบ Admin ด้วย Email (Hard Delete)
        // URL: DELETE api/auth/remove-admin?email=xxxx@gmail.com
        [HttpDelete("remove-admin")]
        public async Task<IActionResult> RemoveAdmin([FromQuery] string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest(new { message = "กรุณาระบุ Email ที่ต้องการลบ" });
            }

            // 1. ค้นหาจาก Email ในตาราง Whitelist
            var adminLog = await _context.AdminWhitelists.FirstOrDefaultAsync(w => w.Email == email);
            
            if (adminLog == null)
            {
                return NotFound(new { message = "ไม่พบ Email นี้ในระบบ Admin Whitelist" });
            }

            // 2. ❌ ลบออกจาก Whitelist ทิ้งทันที
            _context.AdminWhitelists.Remove(adminLog);

            // 3. ปรับสิทธิ์ User คนนั้นให้กลับเป็น User ธรรมดา
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user != null) 
            { 
                user.Role = "User"; 
                _context.Users.Update(user);
            }

            // 4. บันทึก
            await _context.SaveChangesAsync();
            
            return Ok(new { message = $"ลบสิทธิ์ Admin และรายชื่อ ({email}) เรียบร้อยแล้ว" });
        }
     
        // 3. ดูรายชื่อ Admin
        [HttpGet("list-admins")]
        public async Task<IActionResult> GetAdminList() // ❌ เอา parameter secretKey ออก
        {
             // ❌ ลบส่วนเช็ค Secret Key ออก
            
            var list = await _context.AdminWhitelists
                .Select(a => new 
                {
                    a.Email,
                    Status = a.IsActive ? "Active" : "Revoked",
                    TimeIn = a.AddedAt,
                    TimeOut = a.RevokedAt,
                    LastLogin = _context.Users.Where(u => u.Email == a.Email).Select(u => u.LastLoginAt).FirstOrDefault()
                })
                .OrderByDescending(x => x.TimeIn)
                .ToListAsync();

            return Ok(list);
        }
    }

}

