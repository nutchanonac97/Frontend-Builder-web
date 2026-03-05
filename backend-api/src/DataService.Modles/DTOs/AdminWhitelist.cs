using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TopTechInterBackend.DataService.Modles.Model
{
    [Table("AdminWhitelists", Schema = "tt_toptech_inter_db")] // ตั้งชื่อตารางให้ชัดเจน
    public class AdminWhitelist
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsActive { get; set; } = true; // สถานะ (true=ใช้งาน, false=ถูกปลด)
        public DateTime AddedAt { get; set; } = DateTime.UtcNow; // เวลาเข้า (เริ่มเป็นแอดมิน)
        public DateTime? RevokedAt { get; set; } // เวลาออก (ถูกปลดตอนไหน)
    }
    public class AddAdminRequest
    {
        public string Email { get; set; }
        //public string SecretKey { get; set; }
    }
}