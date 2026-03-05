using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
// 👇 1. แก้ Namespace ให้ตรงกับโครงสร้างจริง
using TopTechInterBackend.DataService.Modles.Services; 
using TopTechInterBackend.DataService.Modles.Model; // เพื่อเรียกใช้ ContactForm (ที่เป็น DB Model)

// 👇 2. กำหนด Namespace ให้เป็นหมวด Controller
namespace TopTechInterBackend.DataService.Modles.Controller 
{
    [ApiController]
    [Route("api/[controller]")] // เข้าถึงด้วย: api/contactus
    public class ContactUsController : ControllerBase
    {
        private readonly INotificationService _notifyService;

        // Constructor Injection
        public ContactUsController(INotificationService notifyService)
        {
            _notifyService = notifyService;
        }

        // 1. ลูกค้ากด Submit Form
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitForm([FromBody] ContactFormRequest request)
        {
            // Map จาก DTO (request) ไปเป็น Model (form)
            var form = new ContactForm
            {
                FullName = request.FullName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Message = request.Message,
                // SentStatus อาจจะกำหนด Default ใน Model หรือ Service
            };

            await _notifyService.ProcessContactFormAsync(form);

            if (form.SentStatus == "NO_TOKEN")
            {
                return Ok(new { message = "Received", warning = "Admin integration pending" });
            }

            return Ok(new { message = "Success" });
        }

        // 2. Admin ขอ URL เพื่อไป Login (Connect LINE)
        [HttpGet("admin/connect/{provider}")]
        public async Task<IActionResult> ConnectSocial(string provider)
        {
            try 
            {
                var url = await _notifyService.GetAuthUrlAsync(provider);
                return Ok(new { url });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // 3. Callback หลังจาก Admin Login เสร็จ
        [HttpPost("admin/callback")]
        public async Task<IActionResult> ConnectCallback([FromBody] CallbackRequest req)
        {
            var success = await _notifyService.ExchangeTokenAsync(req.Provider, req.Code);
            if (success) return Ok(new { message = "Connected successfully" });
            return BadRequest(new { message = "Failed to connect" });
        }
    }

    // --- DTO Classes ---
    // (ถ้าจะให้เนี๊ยบ ควรย้าย Class พวกนี้ไปไว้ในโฟลเดอร์ DTOs แยกไฟล์ครับ)
    // แต่ถ้าวางไว้ตรงนี้เพื่อความง่าย ก็ใช้งานได้ครับ
    
    public class ContactFormRequest 
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }

    public class CallbackRequest
    {
        public string Provider { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }
}