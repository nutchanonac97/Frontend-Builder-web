using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToptechCmmUniversalBackendApi.MediaService.VideoService.Video;

[Table("saved_videos")]
public class SavedVideo
{
    [Key] [Column("id")] public int Id { get; set; }
    
    [Column("youtube_video_id")] public string YoutubeVideoId { get; set; } = string.Empty;
    [Column("title")] public string Title { get; set; } = string.Empty;
    [Column("description")] public string? Description { get; set; }
    [Column("thumbnail_url")] public string ThumbnailUrl { get; set; } = string.Empty;
    [Column("publish_date")] public DateTime? PublishDate { get; set; }

    [Column("created_at")] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}