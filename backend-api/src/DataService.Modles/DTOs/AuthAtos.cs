namespace DataService.Modles.DTOs
{
    public class SocialLoginRequest
    {
        public string Provider { get; set; } = string.Empty; // "LINE" หรือ "FACEBOOK"
        public string AccessToken { get; set; } = string.Empty; // Token จาก Frontend
    }

    public class AuthResponse
    {
        public string Token { get; set; } = string.Empty; // JWT ของระบบเรา
        public string Username { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string? ProfilePicture { get; set; }
        public string ChatUrl { get; set; } = string.Empty;
        
    }

    public class LineLoginRequest
    {
        public string AccessToken { get; set; } = string.Empty; // รับ Token จากหน้าบ้าน
    }
    namespace DataService.Modles.DTOs // เช็ค namespace ให้ตรงกับของคุณนะครับ
{
    public class ContactRequest
    {
        public string Name { get; set; }   = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Message { get; set; }  = string.Empty;
    }
    
    public class GoogleLoginRequest
{
    public string? IdToken { get; set; }
}
}


}