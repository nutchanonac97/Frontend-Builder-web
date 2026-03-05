using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TopTechInterBackend.DataService.Modles
{
    [Table("IntegrationConfigs", Schema = "tt_toptech_inter_db")]
    public class IntegrationConfig
    {
        [Key]
        public Guid Id { get; set; }

        public string? ProviderName { get; set; } // เช่น "LINE", "FACEBOOK"

        public string? ClientId { get; set; }     // สำหรับ LINE ใช้เก็บ User ID (ที่ขึ้นต้นด้วย U...)

        public string? ClientSecret { get; set; } // สำหรับ LINE ใช้เก็บ Channel Secret

        public string? AccessToken { get; set; }  // สำหรับ LINE ใช้เก็บ Channel Access Token (Long-lived)

        public string? RefreshToken { get; set; }

        public DateTime? ExpiresAt { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public string? FullName { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Message { get; set; }

        public string? SentStatus { get; set; }
        [Required]
        public string ConfigKey { get; set; } 

        [Required]
        public string ConfigValue { get; set; }

        public string? Description { get; set; }
        
    }
}

// Models/ContactForm.cs
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