using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ToptechCmmUniversalBackendApi.MediaService.VideoService.Video;

public static class VideoEndpoints
{
    public static void MapVideoEndpoints(this IEndpointRouteBuilder app, IConfiguration config)
    {
        var group = app.MapGroup("/api/videos").WithTags("Video Library");

        // 1. 🔍 ค้นหาจาก YouTube (Search)
        // ❌ ของเดิม (ผิด): async ([AsParameters] string query) 
        // ✅ ของใหม่ (แก้แล้ว): async ([FromQuery] string query)
        group.MapGet("/search", async ([FromQuery] string query) =>
        {
            if (string.IsNullOrEmpty(query)) return Results.BadRequest("Query is required");

            try
            {
                var youtubeService = new YouTubeService(new BaseClientService.Initializer()
                {
                    ApiKey = config["Google:ApiKey"],
                    ApplicationName = "CMM Universal App"
                });

                var request = youtubeService.Search.List("snippet");
                request.Q = query;
                request.MaxResults = 10;
                request.Type = "video";

                var response = await request.ExecuteAsync();

                var videos = response.Items.Select(item => new VideoDto(
                    item.Id.VideoId,
                    item.Snippet.Title,
                    item.Snippet.Thumbnails.Medium.Url,
                    item.Snippet.Description
                )).ToList();

                return Results.Ok(videos);
            }
            catch (Exception ex)
            {
                return Results.Problem($"YouTube API Error: {ex.Message}");
            }
        });

        // 2. 💾 บันทึกวิดีโอเก็บไว้ (Save to DB)
        group.MapPost("/", async (SaveVideoRequest req, VideoDbContext db) =>
        {
            if (await db.SavedVideos.AnyAsync(v => v.YoutubeVideoId == req.VideoId))
            {
                return Results.Conflict("Video already saved");
            }

            var newVideo = new SavedVideo
            {
                YoutubeVideoId = req.VideoId,
                Title = req.Title,
                ThumbnailUrl = req.ThumbnailUrl,
                Description = req.Description,
                CreatedAt = DateTime.UtcNow
            };

            db.SavedVideos.Add(newVideo);
            await db.SaveChangesAsync();

            return Results.Ok(new { message = "Saved successfully", id = newVideo.Id });
        });

        // 3. 📜 ดูรายการที่บันทึกไว้ (My List)
        group.MapGet("/", async (VideoDbContext db) =>
        {
            var videos = await db.SavedVideos
                .OrderByDescending(v => v.CreatedAt)
                .Select(v => new VideoDto(v.YoutubeVideoId, v.Title, v.ThumbnailUrl, v.Description))
                .ToListAsync();

            return Results.Ok(videos);
        });
        
        // 4. ❌ ลบวิดีโอที่บันทึก
        group.MapDelete("/{videoId}", async (string videoId, VideoDbContext db) =>
        {
            var video = await db.SavedVideos.FirstOrDefaultAsync(v => v.YoutubeVideoId == videoId);
            if (video == null) return Results.NotFound();

            db.SavedVideos.Remove(video);
            await db.SaveChangesAsync();

            return Results.Ok(new { message = "Deleted" });
        });
    }
}