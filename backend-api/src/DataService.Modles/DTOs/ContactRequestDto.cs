namespace TopTechInterBackend.DataService.Modles.DTOs
{
    /// <summary>
    /// DTO สำหรับรับข้อมูลจาก ContactPage.jsx ของ builder-web
    /// </summary>
    public class ContactRequestDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string Phone { get; set; } = string.Empty;
        public string? Message { get; set; }
        public string? ProjectType { get; set; }
        public string? Budget { get; set; }
    }
}
