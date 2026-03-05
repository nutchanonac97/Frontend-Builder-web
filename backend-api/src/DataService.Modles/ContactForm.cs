using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataService.Modles // ใช้ Namespace ให้ตรงกับชื่อโฟลเดอร์
{
    [Table("ContactForms", Schema = "tt_toptech_inter_db")]
    public class ContactForm
    {
        [Key]
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Message { get; set; }
        public string SentStatus { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}