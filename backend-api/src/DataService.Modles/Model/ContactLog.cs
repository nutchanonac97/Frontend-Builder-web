using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TopTechInterBackend.DataService.Modles.Model
{
    [Table("ContactLogs", Schema = "tt_toptech_inter_db")]
    public class ContactLog
    {
        [Key]
        public Guid Id { get; set; }
        
        public string Name { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Message { get; set; }
        public string? ProjectType { get; set; }
        public string? Budget { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}