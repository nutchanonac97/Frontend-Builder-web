using System.ComponentModel.DataAnnotations;



namespace TopTechInterBackend.DataService.Modles.Model
{
    public class EmailSettings
    {
        [Key]

        public string SenderEmail { get; set; } = string.Empty;
        public string AppPassword { get; set; } = string.Empty;
        public string SmtpHost { get; set; } = "smtp.gmail.com";
        public int SmtpPort { get; set; } = 587;
    }
}