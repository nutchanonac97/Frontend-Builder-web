using Microsoft.EntityFrameworkCore;

namespace ToptechCmmUniversalBackendApi.MediaService.VideoService.Video;

public class VideoDbContext : DbContext
{
    public VideoDbContext(DbContextOptions<VideoDbContext> options) : base(options) { }

    public DbSet<SavedVideo> SavedVideos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        string schema = "tt_toptech_inter_db";

        // SavedVideos
        modelBuilder.Entity<SavedVideo>(entity => {
            entity.ToTable("saved_videos", schema);
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.YoutubeVideoId).HasColumnName("youtube_video_id").IsRequired();
            entity.Property(e => e.Title).HasColumnName("title").IsRequired();
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.ThumbnailUrl).HasColumnName("thumbnail_url");
            entity.Property(e => e.PublishDate).HasColumnName("publish_date");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("CURRENT_TIMESTAMP");
        });
    }
}
