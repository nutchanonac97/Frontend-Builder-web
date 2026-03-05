namespace ToptechCmmUniversalBackendApi.MediaService.LiveRoomService.LiveRoom;

// 1. Response สถานะวิดีโอปัจจุบัน
public record CurrentVideoResponse(
    string VideoId, 
    string Title, 
    bool IsPlaying, 
    int ViewerCount = 0
);

// 2. Request สั่งเปลี่ยนวิดีโอ
public record ChangeVideoRequest(string VideoId, string Title);

// 3. DTO คอมเมนต์ YouTube
public record YoutubeCommentDto(
    string AuthorName, 
    string ProfileImageUrl, 
    string TextDisplay, 
    DateTime? PublishedAt
);

// 4. Request เพิ่มเพลง (Manual)
public record AddToPlaylistRequest(
    string VideoId, 
    string Title, 
    string ThumbnailUrl, 
    int DurationSeconds = 0
);

// 5. Request เพิ่มเพลงด้วย URL (Auto)
public record AddUrlRequest(string Url);

// 6. Response รายการ Playlist (รวมยอดวิว + วันที่ลงคลิป)
public record PlaylistItemDto(
    int Id, 
    string VideoId, 
    string Title, 
    string ThumbnailUrl, 
    int DurationSeconds,
    long Views,           // ยอดวิว
    DateTime? PublishedAt // ✅ วันที่ลงคลิป (ของใหม่)
);