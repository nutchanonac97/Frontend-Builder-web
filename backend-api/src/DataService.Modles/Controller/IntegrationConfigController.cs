using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TopTechInterBackend.DataService.Modles; // Namespace ของ DbContext

namespace TopTechInterBackend.DataService.Modles.Controller
{
    [Route("api/integration-config")]
    [ApiController]
    public class IntegrationConfigController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IntegrationConfigController(AppDbContext context)
        {
            _context = context;
        }

        // ==================================================
        // 🟢 HTTP GET: ดึงข้อมูลทั้งหมด
        // URL: GET api/integration-config
        // ==================================================
        [HttpGet]
        public async Task<IActionResult> GetAllConfigs()
        {
            var configs = await _context.IntegrationConfigs
                .OrderBy(c => c.ConfigKey)
                .ToListAsync();

            return Ok(configs);
        }

        // ==================================================
        // 🟢 HTTP GET (By Key): ดึงข้อมูลตาม Key (แก้ปัญหา 404)
        // URL: GET api/integration-config/Email:SmtpPort
        // ==================================================
        [HttpGet("{key}")]
        public async Task<IActionResult> GetConfigByKey(string key)
        {
            // แปลง URL Decode เผื่อมีตัวอักษรพิเศษ
            string decodedKey = System.Net.WebUtility.UrlDecode(key);

            var config = await _context.IntegrationConfigs
                .FirstOrDefaultAsync(c => c.ConfigKey == decodedKey);

            if (config == null)
            {
                // ถ้าไม่เจอ Return ค่าว่างกลับไป (เพื่อให้ Frontend ไม่ error)
                return Ok(new IntegrationConfig
                {
                    ConfigKey = decodedKey,
                    ConfigValue = "",
                    Description = ""
                });
            }

            return Ok(config);
        }

        // ==================================================
        // 🟡 HTTP POST: เพิ่ม หรือ อัปเดตข้อมูล (Upsert)
        // URL: POST api/integration-config
        // ==================================================
        [HttpPost]
        public async Task<IActionResult> SaveConfig([FromBody] IntegrationConfig config)
        {
            if (string.IsNullOrEmpty(config.ConfigKey))
            {
                return BadRequest("ConfigKey is required.");
            }

            var existing = await _context.IntegrationConfigs
                .FirstOrDefaultAsync(c => c.ConfigKey == config.ConfigKey);

            if (existing != null)
            {
                // -- กรณีมีอยู่แล้ว ให้ UPDATE --
                existing.ConfigValue = config.ConfigValue;
                existing.Description = config.Description;
                existing.IsActive = true;
                // existing.UpdatedAt = DateTime.UtcNow; // เปิดใช้ถ้ามี field นี้
                
                _context.IntegrationConfigs.Update(existing);
            }
            else
            {
                // -- กรณีไม่มี ให้ INSERT --
                // config.CreatedAt = DateTime.UtcNow; // เปิดใช้ถ้ามี field นี้
                _context.IntegrationConfigs.Add(config);
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Saved successfully", data = config });
        }

        // ==================================================
        // 🟠 HTTP PUT: อัปเดตข้อมูล (แบบระบุ Key ชัดเจน)
        // URL: PUT api/integration-config/Email:SmtpPort
        // ==================================================
        [HttpPut("{key}")]
        public async Task<IActionResult> UpdateConfig(string key, [FromBody] IntegrationConfig config)
        {
            if (key != config.ConfigKey) return BadRequest("Key mismatch");

            var existing = await _context.IntegrationConfigs.FirstOrDefaultAsync(c => c.ConfigKey == key);
            if (existing == null) return NotFound();

            existing.ConfigValue = config.ConfigValue;
            existing.Description = config.Description;
            existing.IsActive = config.IsActive;

            _context.IntegrationConfigs.Update(existing);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Updated successfully", data = existing });
        }

        // ==================================================
        // 🔴 HTTP DELETE: ลบข้อมูล
        // URL: DELETE api/integration-config/Email:SmtpPort
        // ==================================================
        [HttpDelete("{key}")]
        public async Task<IActionResult> DeleteConfig(string key)
        {
            var decodedKey = System.Net.WebUtility.UrlDecode(key);
            var config = await _context.IntegrationConfigs.FirstOrDefaultAsync(c => c.ConfigKey == decodedKey);

            if (config == null) return NotFound();

            _context.IntegrationConfigs.Remove(config);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Deleted successfully" });
        }
    }
}