namespace TopTechInterBackend.DataService.Modles.DTOs // หรือ namespace ที่คุณใช้เก็บ DTO
{
    public class UpdateSystemPromptRequest
    {
        // รับค่าข้อความ Prompt ใหม่ที่ต้องการแก้ไข
        public string NewPrompt { get; set; } = string.Empty;
    }
}