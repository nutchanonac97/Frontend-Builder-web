namespace ToptechCmmUniversalBackendApi.MediaService.VideoService.Video;

// DTO สำหรับส่งข้อมูลกลับหน้าบ้าน
public record VideoDto(string VideoId, string Title, string ThumbnailUrl, string? Description);

// DTO สำหรับรับข้อมูลบันทึก
public record SaveVideoRequest(string VideoId, string Title, string ThumbnailUrl, string? Description);