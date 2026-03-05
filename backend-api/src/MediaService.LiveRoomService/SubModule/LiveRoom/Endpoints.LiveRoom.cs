using System.Text.RegularExpressions;
using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace ToptechCmmUniversalBackendApi.MediaService.LiveRoomService.LiveRoom;

public static class LiveRoomEndpoints
{
    public static void MapLiveRoomEndpoints(this IEndpointRouteBuilder app, IConfiguration config)
    {
        var group = app.MapGroup("/api/live-room").WithTags("Live Room Player");

        // 1. GET Current Video
        group.MapGet("/current-video", async (LiveRoomDbContext db) =>
        {
            var state = await db.RoomStates.FirstOrDefaultAsync(r => r.Id == 1);
            if (state == null) return Results.Ok(new CurrentVideoResponse("", "No Video", false, 0));
            return Results.Ok(new CurrentVideoResponse(state.YoutubeVideoId, state.VideoTitle, state.IsLive, state.ViewerCount));
        });

        // 2. PUT Change Video
        group.MapPut("/change-video", async (ChangeVideoRequest req, LiveRoomDbContext db, IHubContext<LiveRoomHub> hub, IConfiguration cfg) =>
        {
            var state = await db.RoomStates.FirstOrDefaultAsync(r => r.Id == 1);
            if (state == null) { state = new RoomState { Id = 1 }; db.RoomStates.Add(state); }

            int currentViews = await GetYoutubeViewCount(req.VideoId, cfg["Google:ApiKey"]);

            state.YoutubeVideoId = req.VideoId;
            state.VideoTitle = req.Title;
            state.IsLive = true;
            state.ViewerCount = currentViews;
            state.UpdatedAt = DateTime.UtcNow;

            await db.SaveChangesAsync();
            await hub.Clients.All.SendAsync("ReceiveCurrentVideo", 
                new CurrentVideoResponse(state.YoutubeVideoId, state.VideoTitle, state.IsLive, state.ViewerCount));
            
            return Results.Ok(new { message = $"Now Playing: {req.Title}" });
        });

        // 3. GET YouTube Comments
        group.MapGet("/youtube-comments/{videoId}", async (string videoId, IMemoryCache cache, IConfiguration cfg) =>
        {
            string cacheKey = $"yt_comments_{videoId}";
            if (cache.TryGetValue(cacheKey, out List<YoutubeCommentDto>? cachedComments)) return Results.Ok(cachedComments);

            try
            {
                var youtubeService = new YouTubeService(new BaseClientService.Initializer() { ApiKey = cfg["Google:ApiKey"], ApplicationName = "CMM App" });
                var request = youtubeService.CommentThreads.List("snippet");
                request.VideoId = videoId;
                request.MaxResults = 20;
                request.TextFormat = CommentThreadsResource.ListRequest.TextFormatEnum.PlainText;

                var response = await request.ExecuteAsync();
                var comments = response.Items.Select(item => new YoutubeCommentDto(
                    item.Snippet.TopLevelComment.Snippet.AuthorDisplayName,
                    item.Snippet.TopLevelComment.Snippet.AuthorProfileImageUrl,
                    item.Snippet.TopLevelComment.Snippet.TextDisplay,
                    item.Snippet.TopLevelComment.Snippet.PublishedAtDateTimeOffset?.DateTime
                )).ToList();

                cache.Set(cacheKey, comments, new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(5)));
                return Results.Ok(comments);
            }
            catch { return Results.Ok(new List<YoutubeCommentDto>()); }
        });

        // 4. GET Playlist (With Views & PublishedAt)
        group.MapGet("/playlist", async (LiveRoomDbContext db, IConfiguration cfg) =>
        {
            var playlistItems = await db.PlaylistQueues.OrderBy(x => x.OrderIndex).ToListAsync();
            if (playlistItems.Count == 0) return Results.Ok(new List<PlaylistItemDto>());

            // ดึงยอดวิวแบบ Batch
            var videoIds = playlistItems.Select(x => x.YoutubeId).Distinct().ToList();
            var viewsDict = await GetBatchYoutubeViews(videoIds, cfg["Google:ApiKey"]);

            var result = playlistItems.Select(x => new PlaylistItemDto(
                x.Id, 
                x.YoutubeId, 
                x.Title, 
                x.ThumbnailUrl, 
                x.DurationSeconds,
                viewsDict.GetValueOrDefault(x.YoutubeId, 0),
                x.YoutubePublishedAt // ✅ ส่งวันที่กลับไป
            )).ToList();

            return Results.Ok(result);
        });

        // 5. POST Playlist (Manual)
        group.MapPost("/playlist", async (AddToPlaylistRequest req, LiveRoomDbContext db, IHubContext<LiveRoomHub> hub) =>
        {
            var maxOrder = await db.PlaylistQueues.MaxAsync(x => (int?)x.OrderIndex) ?? 0;
            var newItem = new PlaylistQueue { 
                YoutubeId = req.VideoId, Title = req.Title, ThumbnailUrl = req.ThumbnailUrl, 
                OrderIndex = maxOrder + 1, DurationSeconds = req.DurationSeconds, AddedAt = DateTime.UtcNow 
            };
            db.PlaylistQueues.Add(newItem);
            await db.SaveChangesAsync();
            await hub.Clients.All.SendAsync("ReceivePlaylistUpdate");
            return Results.Ok(new { message = "Added", id = newItem.Id });
        });

        // 6. POST Playlist from URL (Auto Fetch: Details + Date + Duration)
        group.MapPost("/playlist/from-url", async (AddUrlRequest req, LiveRoomDbContext db, IHubContext<LiveRoomHub> hub, IConfiguration config) =>
        {
            string? videoId = ExtractVideoId(req.Url);
            if (string.IsNullOrEmpty(videoId)) return Results.BadRequest(new { message = "Invalid YouTube URL" });

            if (await db.PlaylistQueues.AnyAsync(x => x.YoutubeId == videoId))
                return Results.Conflict(new { message = "Duplicate video" });

            // ดึงข้อมูลจาก YouTube
            string title = "Unknown Title", thumbnail = "";
            int durationSeconds = 0;
            DateTime? publishedAt = null;

            try 
            {
                var youtubeService = new YouTubeService(new BaseClientService.Initializer() { ApiKey = config["Google:ApiKey"], ApplicationName = "CMM App" });
                var request = youtubeService.Videos.List("snippet,contentDetails"); 
                request.Id = videoId;
                var response = await request.ExecuteAsync();
                var video = response.Items.FirstOrDefault();
                
                if (video != null)
                {
                    title = video.Snippet.Title;
                    thumbnail = video.Snippet.Thumbnails.Medium?.Url ?? video.Snippet.Thumbnails.Default__?.Url ?? "";
                    
                    // แปลงเวลา
                    try { durationSeconds = ParseIso8601DurationToSeconds(video.ContentDetails.Duration); } catch { durationSeconds = 0; }
                    
                    // ✅ แปลงวันที่ (ISO -> DateTime)
                    if (video.Snippet.PublishedAtDateTimeOffset.HasValue)
                    {
                        publishedAt = video.Snippet.PublishedAtDateTimeOffset.Value.UtcDateTime;
                    }
                }
            }
            catch { /* Ignore */ }

            // จัดการคิว (Gap Filling)
            var existingIndexes = await db.PlaylistQueues.OrderBy(x => x.OrderIndex).Select(x => x.OrderIndex).ToListAsync();
            int newOrderIndex = 1;
            foreach (var index in existingIndexes) { if (index == newOrderIndex) newOrderIndex++; else break; }

            var newItem = new PlaylistQueue
            {
                YoutubeId = videoId, 
                Title = title, 
                ThumbnailUrl = thumbnail,
                OrderIndex = newOrderIndex, 
                DurationSeconds = durationSeconds, 
                YoutubePublishedAt = publishedAt, // ✅ บันทึกลง DB
                AddedAt = DateTime.UtcNow
            };

            db.PlaylistQueues.Add(newItem);
            await db.SaveChangesAsync();
            await hub.Clients.All.SendAsync("ReceivePlaylistUpdate");
            return Results.Ok(new { message = "Added successfully", video = newItem });
        });

        // 7. POST Play
        group.MapPost("/playlist/{id}/play", async (int id, LiveRoomDbContext db, IHubContext<LiveRoomHub> hub, IConfiguration cfg) =>
        {
            var item = await db.PlaylistQueues.FindAsync(id);
            if (item == null) return Results.NotFound();

            var state = await db.RoomStates.FirstOrDefaultAsync(r => r.Id == 1);
            if (state == null) { state = new RoomState { Id = 1 }; db.RoomStates.Add(state); }
            
            int currentViews = await GetYoutubeViewCount(item.YoutubeId, cfg["Google:ApiKey"]);

            state.YoutubeVideoId = item.YoutubeId; state.VideoTitle = item.Title; 
            state.IsLive = true; state.ViewerCount = currentViews; state.UpdatedAt = DateTime.UtcNow;
            
            await db.SaveChangesAsync();
            await hub.Clients.All.SendAsync("ReceiveCurrentVideo", 
                new CurrentVideoResponse(state.YoutubeVideoId, state.VideoTitle, state.IsLive, state.ViewerCount));
            
            return Results.Ok(new { message = $"Now Playing: {item.Title}" });
        });

        // 8. DELETE
        group.MapDelete("/playlist/{id}", async (int id, LiveRoomDbContext db, IHubContext<LiveRoomHub> hub) =>
        {
            var item = await db.PlaylistQueues.FindAsync(id);
            if (item == null) return Results.NotFound();
            db.PlaylistQueues.Remove(item);
            await db.SaveChangesAsync();
            await hub.Clients.All.SendAsync("ReceivePlaylistUpdate");
            return Results.Ok(new { message = "Removed" });
        });

        // 9. Count
        group.MapGet("/playlist/count", async (LiveRoomDbContext db) => Results.Ok(new { count = await db.PlaylistQueues.CountAsync() }));

        // 10. Update Viewers
        group.MapPost("/update-viewers", async ([FromQuery] int viewers, LiveRoomDbContext db) =>
        {
            var state = await db.RoomStates.FirstOrDefaultAsync(r => r.Id == 1);
            if (state == null) { state = new RoomState { Id = 1 }; db.RoomStates.Add(state); }
            state.ViewerCount = viewers;
            state.UpdatedAt = DateTime.UtcNow;
            await db.SaveChangesAsync();
            return Results.Ok(new { message = "Updated", viewers = viewers });
        });

        // 11. Standalone View Check
        group.MapGet("/videos/{videoId}/views", async (string videoId, IConfiguration cfg) =>
        {
            int views = await GetYoutubeViewCount(videoId, cfg["Google:ApiKey"]);
            return Results.Ok(new { videoId, views, formattedViews = views.ToString("N0") });
        });
    }

    // --- Helpers ---

    private static async Task<int> GetYoutubeViewCount(string videoId, string? apiKey)
    {
        if (string.IsNullOrEmpty(apiKey)) return 0;
        try
        {
            var youtubeService = new YouTubeService(new BaseClientService.Initializer() { ApiKey = apiKey, ApplicationName = "CMM App" });
            var request = youtubeService.Videos.List("statistics");
            request.Id = videoId;
            var response = await request.ExecuteAsync();
            var video = response.Items.FirstOrDefault();
            if (video != null && ulong.TryParse(video.Statistics.ViewCount?.ToString(), out ulong views))
                return views > int.MaxValue ? int.MaxValue : (int)views;
        }
        catch { /* Ignore */ }
        return 0;
    }

    private static async Task<Dictionary<string, long>> GetBatchYoutubeViews(List<string> videoIds, string? apiKey)
    {
        var result = new Dictionary<string, long>();
        if (string.IsNullOrEmpty(apiKey) || videoIds.Count == 0) return result;
        try
        {
            var youtubeService = new YouTubeService(new BaseClientService.Initializer() { ApiKey = apiKey, ApplicationName = "CMM App" });
            var chunks = videoIds.Chunk(50);
            foreach (var chunk in chunks)
            {
                var request = youtubeService.Videos.List("statistics");
                request.Id = string.Join(",", chunk);
                var response = await request.ExecuteAsync();
                if (response.Items != null)
                {
                    foreach (var item in response.Items)
                    {
                        if (ulong.TryParse(item.Statistics.ViewCount?.ToString(), out ulong views))
                            result[item.Id] = (long)views;
                    }
                }
            }
        }
        catch { /* Ignore */ }
        return result;
    }

    private static string? ExtractVideoId(string url)
    {
        var regex = new Regex(@"(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^""&?\/\s]{11})");
        var match = regex.Match(url);
        return match.Success ? match.Groups[1].Value : null;
    }

    private static int ParseIso8601DurationToSeconds(string isoDuration)
    {
        if (string.IsNullOrEmpty(isoDuration)) return 0;
        var hMatch = Regex.Match(isoDuration, "(\\d+)H");
        var mMatch = Regex.Match(isoDuration, "(\\d+)M");
        var sMatch = Regex.Match(isoDuration, "(\\d+)S");
        int.TryParse(hMatch.Groups[1].Value, out int h);
        int.TryParse(mMatch.Groups[1].Value, out int m);
        int.TryParse(sMatch.Groups[1].Value, out int s);
        return h * 3600 + m * 60 + s;
    }
}