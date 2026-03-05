using System.Threading.Tasks;

namespace TopTechInterBackend.Services
{
    public interface ILineBotService
    {
        // ฟังก์ชันรับ Webhook จาก Controller
        Task HandleWebhook(string requestBody, string signature);
    }
}