using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TopTechInterBackend.DataService.Modles.Model // <--- ต้องชื่อนี้เป๊ะๆ ห้ามผิด
{
    [Table("Users", Schema = "tt_toptech_inter_db")]
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? LineUserId { get; set; }
        public string? FacebookUserId { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public string Role { get; set; } = "User";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
        public string? GoogleUserId { get; set; } // เพิ่มอันนี้
        
    }
}