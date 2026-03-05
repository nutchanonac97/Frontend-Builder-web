using System.Threading.Tasks;
using TopTechInterBackend.DataService.Modles.DTOs;   // เรียกใช้ DTOs
using TopTechInterBackend.DataService.Modles.Model;  // เรียกใช้ User Model

namespace TopTechInterBackend.DataService.Modles // Namespace หลัก (เพื่อให้เรียกใช้ง่าย)
{
    public interface ISocialAuthService
    {
        // 1. Login แบบรวม (LINE / Facebook)
        Task<User> VerifyAndGetUserAsync(SocialLoginRequest request);

        // 2. Login แบบเฉพาะ LINE (ถ้ายังใช้อยู่)
        Task<User> VerifyLineTokenAsync(string accessToken);

        // 3. Login แบบ Google (ที่เราเพิ่งเพิ่มตะกี้)
        // เปลี่ยนจาก Task<User> เป็น Task<GoogleUserProfile>
        Task<GoogleUserProfile> VerifyGoogleTokenAsync(GoogleLoginRequest request);
    }
}