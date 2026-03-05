using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using TopTechInterBackend.DataService.Modles.DTOs;
using TopTechInterBackend.DataService.Modles.Model;

namespace TopTechInterBackend.DataService.Modles.Services
{
    public class SocialAuthService : ISocialAuthService
    {
        private readonly AppDbContext _context;
        private readonly HttpClient _httpClient;

        public SocialAuthService(AppDbContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClient = httpClientFactory.CreateClient();
        }

        // =========================================================================
        // 🟢 ส่วนที่ 1: LINE / Facebook (Legacy - ยัง Save DB ในนี้เหมือนเดิม)
        // =========================================================================
        
        public async Task<User> VerifyLineTokenAsync(string accessToken)
        {
            // ... (โค้ดเดิมของคุณ ไม่ต้องแก้) ...
            var request = new HttpRequestMessage(HttpMethod.Get, "https://api.line.me/v2/profile");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var response = await _httpClient.SendAsync(request);
            if (!response.IsSuccessStatusCode) throw new Exception("LINE Token ไม่ถูกต้อง หรือหมดอายุ");

            var jsonString = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(jsonString);

            string lineUserId = json["userId"]?.ToString() ?? "";
            string displayName = json["displayName"]?.ToString() ?? "Unknown User";
            string pictureUrl = json["pictureUrl"]?.ToString() ?? "";

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
                    CreatedAt = DateTime.UtcNow
                };
                _context.Users.Add(user);
            }
            else
            {
                user.Username = displayName;
                user.ProfilePictureUrl = pictureUrl;
            }

            user.LastLoginAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> VerifyAndGetUserAsync(SocialLoginRequest request)
        {
            // ... (โค้ดเดิมของคุณ ไม่ต้องแก้) ...
             string socialId = "";
            string name = "Unknown";
            string? picture = null;
            string? email = null;

            if (request.Provider.ToUpper() == "LINE")
            {
                var reqMsg = new HttpRequestMessage(HttpMethod.Get, "https://api.line.me/v2/profile");
                reqMsg.Headers.Authorization = new AuthenticationHeaderValue("Bearer", request.AccessToken);
                
                var response = await _httpClient.SendAsync(reqMsg);
                if (!response.IsSuccessStatusCode) throw new Exception("LINE Token Invalid");

                var jsonString = await response.Content.ReadAsStringAsync();
                var json = JObject.Parse(jsonString);

                socialId = json["userId"]?.ToString() ?? "";
                name = json["displayName"]?.ToString() ?? "Unknown";
                picture = json["pictureUrl"]?.ToString();
            }
            else if (request.Provider.ToUpper() == "FACEBOOK")
            {
                var url = $"https://graph.facebook.com/me?fields=id,name,email,picture.width(500)&access_token={request.AccessToken}";
                var response = await _httpClient.GetAsync(url);
                
                if (!response.IsSuccessStatusCode) throw new Exception("Facebook Token Invalid");

                var jsonString = await response.Content.ReadAsStringAsync();
                var json = JObject.Parse(jsonString);

                socialId = json["id"]?.ToString() ?? "";
                name = json["name"]?.ToString() ?? "Unknown";
                email = json["email"]?.ToString();
                picture = json["picture"]?["data"]?["url"]?.ToString();
            }
            else 
            {
                throw new Exception("Provider not supported");
            }

            User? user = null;
            if (request.Provider.ToUpper() == "LINE")
            {
                user = await _context.Users.FirstOrDefaultAsync(u => u.LineUserId == socialId);
            }
            else
            {
                user = await _context.Users.FirstOrDefaultAsync(u => u.FacebookUserId == socialId);
            }

            if (user == null)
            {
                user = new User
                {
                    Id = Guid.NewGuid(),
                    Username = name,
                    Email = email,
                    LineUserId = request.Provider.ToUpper() == "LINE" ? socialId : null,
                    FacebookUserId = request.Provider.ToUpper() == "FACEBOOK" ? socialId : null,
                    ProfilePictureUrl = picture,
                    CreatedAt = DateTime.UtcNow,
                    Role = "User"
                };
                _context.Users.Add(user);
            }
            else
            {
                user.ProfilePictureUrl = picture;
                if (!string.IsNullOrEmpty(email)) user.Email = email;
            }

            user.LastLoginAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return user;
        }

        // =========================================================================
        // 🟡 ส่วนที่ 2: Google Login (Updated ✅)
        // =========================================================================
        
        public async Task<GoogleUserProfile> VerifyGoogleTokenAsync(GoogleLoginRequest request)
        {
            // 1. เช็ค Token ว่าว่างไหม
            if (string.IsNullOrWhiteSpace(request.IdToken))
            {
                throw new Exception("Google Token is empty");
            }

            // 2. ถาม Google
            var url = $"https://oauth2.googleapis.com/tokeninfo?id_token={request.IdToken}";
            var response = await _httpClient.GetAsync(url);
            var jsonString = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"❌ Google Error: {jsonString}");
                throw new Exception($"Invalid Google Token: {jsonString}");
            }

            var json = JObject.Parse(jsonString);

            // 3. ✅ ส่งค่ากลับเป็น DTO (ตัดส่วน Save DB ออกไปไว้ที่ Controller)
            return new GoogleUserProfile
            {
                GoogleUserId = json["sub"]?.ToString(),
                Email = json["email"]?.ToString(),
                Name = json["name"]?.ToString(),
                Picture = json["picture"]?.ToString()
            };
        }
    }
}