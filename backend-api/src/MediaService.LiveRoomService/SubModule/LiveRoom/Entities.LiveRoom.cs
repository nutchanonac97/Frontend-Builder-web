using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToptechCmmUniversalBackendApi.MediaService.LiveRoomService.LiveRoom;

[Table("playlist_queue")]
public class PlaylistQueue
{
    [Key] [Column("id")] public int Id { get; set; }
    
    [Column("youtube_id")] public string YoutubeId { get; set; } = string.Empty;
    [Column("title")] public string Title { get; set; } = string.Empty;
    [Column("thumbnail")] public string ThumbnailUrl { get; set; } = string.Empty;
    
    [Column("order_index")] public int OrderIndex { get; set; }
    
    // ความยาวคลิป (วินาที)
    [Column("duration_seconds")] public int DurationSeconds { get; set; } = 0;
    
    // ✅ วันที่เผยแพร่บน YouTube (ของใหม่)
    [Column("yt_published_at")] public DateTime? YoutubePublishedAt { get; set; }

    // วันที่เพิ่มเข้ามาในคิว
    [Column("added_at")] public DateTime AddedAt { get; set; } = DateTime.UtcNow;
}