using Microsoft.AspNetCore.Mvc;
using TopTechInterBackend.DataService.Modles.DTOs;
using TopTechInterBackend.DataService.Modles.Services;

namespace TopTechInterBackend.DataService.Modles.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
        {
            try
            {
                await _emailService.SendEmailAsync(request);
                return Ok(new { message = "Email sent successfully!" });
            }
            catch (Exception ex)
            {
                // ใน Production อาจจะ Log Error ไว้ดู
                return StatusCode(500, new { message = "Failed to send email", error = ex.Message });
            }
        }
    }
}