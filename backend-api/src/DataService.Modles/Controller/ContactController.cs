using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TopTechInterBackend.DataService.Modles;
using TopTechInterBackend.DataService.Modles.Model;
using TopTechInterBackend.DataService.Modles.DTOs;
using TopTechInterBackend.DataService.Modles.Services;

namespace TopTechInterBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _config;

        public ContactController(AppDbContext context, IEmailService emailService, IConfiguration config)
        {
            _context = context;
            _emailService = emailService;
            _config = config;
        }

        // =========================================================
        // 📋 1. ดึงรายการผู้ติดต่อ (GET)
        // =========================================================
        [HttpGet("logs")]
        public async Task<IActionResult> GetContactLogs(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] string? search = null)
        {
            var query = _context.ContactLogs.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                search = search.ToLower();
                query = query.Where(x =>
                    (x.Name != null && x.Name.ToLower().Contains(search)) ||
                    (x.Email != null && x.Email.ToLower().Contains(search)) ||
                    (x.Phone != null && x.Phone.Contains(search))
                );
            }

            int totalItems = await query.CountAsync();

            var logs = await query
                .OrderByDescending(x => x.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                TotalItems = totalItems,
                CurrentPage = page,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                Data = logs
            });
        }

        // =========================================================
        // 🗑️ 2. ลบรายการ (DELETE)
        // =========================================================
        [HttpDelete("logs/{id}")]
        public async Task<IActionResult> DeleteContactLog(Guid id)
        {
            var log = await _context.ContactLogs.FindAsync(id);
            if (log == null)
                return NotFound(new { message = "ไม่พบรายการที่ต้องการลบ" });

            _context.ContactLogs.Remove(log);
            await _context.SaveChangesAsync();

            return Ok(new { message = "ลบรายการเรียบร้อยแล้ว" });
        }

        // =========================================================
        // 📩 3. ส่งข้อความติดต่อ (POST)
        // URL: POST api/contact/send
        // Body: { name, phone, email?, message?, projectType?, budget? }
        // =========================================================
        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] ContactRequestDto request)
        {
            if (request == null || string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Phone))
                return BadRequest(new { message = "กรุณากรอกชื่อและเบอร์โทรศัพท์" });

            // 3.1 บันทึกลง Database
            var newLog = new ContactLog
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                Message = request.Message,
                ProjectType = request.ProjectType,
                Budget = request.Budget,
                CreatedAt = DateTime.UtcNow
            };

            _context.ContactLogs.Add(newLog);
            await _context.SaveChangesAsync();

            // 3.2 ส่งอีเมลแจ้งเตือน Admin
            try
            {
                var adminEmailConfig = await _context.IntegrationConfigs
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.ConfigKey == "Email:AdminReceiver");

                string toEmail = adminEmailConfig?.ConfigValue ?? "s65122519067@ssru.ac.th";

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
                                <li style='padding: 8px 0; border-bottom: 1px solid #eee;'>🏗️ <b>ประเภทโปรเจกต์:</b> {request.ProjectType ?? "-"}</li>
                                <li style='padding: 8px 0; border-bottom: 1px solid #eee;'>💰 <b>งบประมาณ:</b> {request.Budget ?? "-"}</li>
                            </ul>
                            <p style='margin-top: 20px;'><b>ข้อความ:</b><br>{request.Message ?? "-"}</p>
                        </div>
                    </div>
                ";

                var emailDto = new EmailRequest
                {
                    ToEmail = toEmail,
                    Subject = subject,
                    Body = body,
                    IsHtml = true
                };

                await _emailService.SendEmailAsync(emailDto);
            }
            catch (Exception ex)
            {
                // ถ้าส่งเมลไม่ผ่าน ไม่ให้ Error กับ User แต่ Log ไว้
                Console.WriteLine($"Mail Error: {ex.Message}");
            }

            return Ok(new { message = "บันทึกข้อมูลและส่งอีเมลสำเร็จ" });
        }
    }
}