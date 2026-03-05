using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToptechCmmUniversalBackendApi.MediaService.LiveRoomService.LiveRoom;

// ตารางเก็บสถานะห้อง (จอใหญ่เล่นอะไรอยู่ + ยอดคนดู)
[Table("room_state")]
public class RoomState
{
    [Key] [Column("id")] public int Id { get; set; }
    
    [Column("current_youtube_id")] public string YoutubeVideoId { get; set; } = string.Empty;
    [Column("video_title")] public string VideoTitle { get; set; } = string.Empty;
    
    [Column("caster_name")] public string CasterName { get; set; } = "Auto DJ";
    [Column("is_live")] public bool IsLive { get; set; } = false;

    // ✅ ยอดคนดู
    [Column("viewer_count")] public int ViewerCount { get; set; } = 0;

    [Column("updated_at")] public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}