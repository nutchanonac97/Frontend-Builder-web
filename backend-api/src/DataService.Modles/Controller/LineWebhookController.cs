using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using TopTechInterBackend.Services; // เรียกใช้ Service ที่เราเพิ่งสร้าง

namespace TopTechInterBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LineWebhookController : ControllerBase
    {
        private readonly ILineBotService _lineBotService;

        public LineWebhookController(ILineBotService lineBotService)
        {
            _lineBotService = lineBotService;
        }

        [HttpPost]
        public async Task<IActionResult> ReceiveWebhook()
        {
            try
            {
                // 1. อ่าน Signature จาก Header
                Request.Headers.TryGetValue("x-line-signature", out var signature);

                // 2. อ่าน Body
                using var reader = new StreamReader(Request.Body);
                var body = await reader.ReadToEndAsync();

                if (string.IsNullOrEmpty(body)) return Ok();

                // 3. ส่งให้ Service ทำงาน (AI + Logic ทั้งหมดอยู่ที่นั่น)
                await _lineBotService.HandleWebhook(body, signature.ToString());

                return Ok();
            }
            catch
            {
                // LINE ต้องการ Status 200 OK เสมอ แม้ Server เราจะพัง
                return Ok();
            }
        }
    }
}