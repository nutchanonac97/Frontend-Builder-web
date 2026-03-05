using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TopTechInterBackend.DataService.Modles;
using TopTechInterBackend.DataService.Modles.Model;
using TopTechInterBackend.DataService.Modles.DTOs; // อย่าลืม using DTO ที่เพิ่งสร้าง
using TopTechInterBackend.DataService.Modles.Services;


namespace TopTechInterBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private const string PROMPT_KEY = "LineBot_SystemPrompt"; // Key ต้องตรงกับที่ใช้ใน Service

        public SettingsController(AppDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // 1. GET: ดู Prompt ปัจจุบัน
        // URL: GET /api/settings/system-prompt
        // ==========================================
        [HttpGet("system-prompt")]
        public async Task<IActionResult> GetSystemPrompt()
        {
            var setting = await _context.AppSettings
                                        .AsNoTracking()
                                        .FirstOrDefaultAsync(x => x.Key == PROMPT_KEY);

            if (setting == null)
            {
                return Ok(new { prompt = "ยังไม่มีการตั้งค่า Prompt ในระบบ (ใช้ค่า Default)" });
            }

            return Ok(new { prompt = setting.Value });
        }

        // ==========================================
        // 2. POST: อัปเดต/สร้าง Prompt ใหม่
        // URL: POST /api/settings/system-prompt
        // ==========================================
        [HttpPost("system-prompt")]
        public async Task<IActionResult> UpdateSystemPrompt([FromBody] UpdateSystemPromptRequest request)
        {
            if (string.IsNullOrEmpty(request.NewPrompt))
            {
                return BadRequest("กรุณาระบุข้อความ Prompt");
            }

            // ค้นหาว่ามี Key นี้อยู่แล้วหรือไม่
            var setting = await _context.AppSettings
                                        .FirstOrDefaultAsync(x => x.Key == PROMPT_KEY);

            if (setting == null)
            {
                // ถ้ายังไม่มี ให้สร้างใหม่ (Insert)
                setting = new AppSettings
                {
                    Key = PROMPT_KEY,
                    Value = request.NewPrompt
                };
                _context.AppSettings.Add(setting);
            }
            else
            {
                // ถ้ามีแล้ว ให้อัปเดตค่าเดิม (Update)
                setting.Value = request.NewPrompt;
                _context.AppSettings.Update(setting);
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "อัปเดต System Prompt เรียบร้อยแล้ว! ✅", currentPrompt = setting.Value });
        }
    }
}