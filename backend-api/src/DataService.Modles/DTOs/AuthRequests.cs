namespace DataService.Modles.DTOs
{
    // ✅ เหลือไว้แค่ 2 ตัวนี้พอครับ (เพราะเดิมมันไม่มี)
    
    // กล่องรับข้อมูลสำหรับ Google Login
    public class GoogleLoginRequest
    {
        public string IdToken { get; set; }
    }

    // กล่องรับข้อมูลสำหรับ Contact Form
    public class ContactRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }

        public string Phone { get; set; }
        public string Message { get; set; }
    }
}