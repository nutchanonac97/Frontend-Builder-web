namespace TopTechInterBackend.DataService.Modles.DTOs // 👈 เช็ค Namespace ต้องตรงนี้
{
    // 1. 👇 ตัวที่ Error อยู่ คือตัวนี้ครับ ต้องมี!
    public class GoogleLoginRequest
    {
        public string? IdToken { get; set; }
    }

    // 2. Login อื่นๆ
    public class LineLoginRequest
    {
        public string AccessToken { get; set; } = string.Empty;
    }

    public class SocialLoginRequest
    {
        public string Provider { get; set; } = string.Empty;
        public string AccessToken { get; set; } = string.Empty;
    }

    // 3. Response & Contact
    public class AuthResponse
    {
        public string Token { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string? ProfilePicture { get; set; }
        public string ChatUrl { get; set; } = string.Empty;
    }

    public class ContactRequest
    {
        public string Name { get; set; } = string.Empty;
        
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }

   

    // คลาสสำหรับส่งข้อมูลจาก Service กลับมาที่ Controller
        public class GoogleUserProfile
        {
            public string GoogleUserId { get; set; }
            public string Email { get; set; }
            public string Name { get; set; }
            public string Picture { get; set; }
        }

        

}