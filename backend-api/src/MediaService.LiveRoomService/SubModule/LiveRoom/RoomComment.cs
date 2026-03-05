using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToptechCmmUniversalBackendApi.MediaService.LiveRoomService.LiveRoom;

[Table("room_comments")]
public class RoomComment
{
    [Key] [Column("id")] public long Id { get; set; }
    [Column("user_name")] public string UserName { get; set; } = "Guest";
    [Column("message")] public string Message { get; set; } = string.Empty;
    [Column("created_at")] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}