using Microsoft.EntityFrameworkCore;
using ToptechCmmUniversalBackendApi.ExampleService.DemoService.ExampleTable1.Entities;
using ToptechCmmUniversalBackendApi.MediaService.LiveRoomService.LiveRoom; 
using ToptechCmmUniversalBackendApi.MediaService.VideoService.Video; // ✅ ต้องมี namespace นี้สำหรับ SavedVideo
using TopTechInterBackend.DataService.Modles.Model; // 👈 เพิ่มบรรทัดนี้เพื่อให้โปรเจกต์รู้จัก IntegrationConfig
using TopTechInterBackend.DataService.Modles;

namespace ToptechCmmUniversalBackendApi.ExampleService.DemoService.ExampleTable1.Data;

public class ExampleTable1DbContext : DbContext
{
    public ExampleTable1DbContext(DbContextOptions<ExampleTable1DbContext> options) : base(options) { }

    // -------------------------------------------------------------------------
    // 1. ตาราง ExampleTable1 (✅ เอาแค่อันนี้อันเดียวพอครับ ตัวที่มี s ลบทิ้ง)
    // -------------------------------------------------------------------------
    public DbSet<ExampleTable1Entity> ExampleTable1 { get; set; }

    // -------------------------------------------------------------------------
    // 2. ตารางของ LiveRoom & Video
    // -------------------------------------------------------------------------
    public DbSet<RoomState> RoomStates { get; set; }
    public DbSet<PlaylistQueue> PlaylistQueues { get; set; }
    public DbSet<RoomComment> RoomComments { get; set; }
    public DbSet<SavedVideo> SavedVideos { get; set; } // ✅
    
    public DbSet<IntegrationConfig> IntegrationConfigs { get; set; }

    public DbSet<ContactForm> ContactForms { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ✅ กลับมาใช้ Schema เดิมตามที่คุณต้องการ
        string schema = "tt_toptech_inter_db";

        // --- Config ExampleTable1 ---
        modelBuilder.Entity<ExampleTable1Entity>(entity => {
            entity.ToTable("ExampleTable1", schema);
            entity.HasKey(e => e.ExampleTable1Id);
            entity.Property(e => e.ExampleTable1Id).HasColumnName("exampletable1_id");
            entity.Property(e => e.ExampleTable1Name).HasColumnName("exampletable1_name").HasMaxLength(200);
            entity.Property(e => e.ExampleTable1Description).HasColumnName("exampletable1_description").HasMaxLength(500);
            entity.Property(e => e.Status).HasColumnName("Status").HasMaxLength(20).HasDefaultValue("active");
            entity.Property(e => e.CreatedAt).HasColumnName("CreatedAt").HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasColumnName("UpdatedAt").HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        // --- Config RoomState ---
        modelBuilder.Entity<RoomState>(entity => {
            entity.ToTable("room_state", schema);
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.YoutubeVideoId).HasColumnName("current_youtube_id");
            entity.Property(e => e.VideoTitle).HasColumnName("video_title");
            entity.Property(e => e.CasterName).HasColumnName("caster_name");
            entity.Property(e => e.IsLive).HasColumnName("is_live");
            entity.Property(e => e.ViewerCount).HasColumnName("viewer_count").HasDefaultValue(0);
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at").HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        // --- Config PlaylistQueue ---
        modelBuilder.Entity<PlaylistQueue>(entity => {
            entity.ToTable("playlist_queue", schema);
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.YoutubeId).HasColumnName("youtube_id");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.ThumbnailUrl).HasColumnName("thumbnail");
            entity.Property(e => e.OrderIndex).HasColumnName("order_index");
            entity.Property(e => e.DurationSeconds).HasColumnName("duration_seconds").HasDefaultValue(0);
            entity.Property(e => e.YoutubePublishedAt).HasColumnName("yt_published_at");
            entity.Property(e => e.AddedAt).HasColumnName("added_at").HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        // --- Config RoomComment ---
        modelBuilder.Entity<RoomComment>(entity => {
            entity.ToTable("room_comments", schema);
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserName).HasColumnName("user_name");
            entity.Property(e => e.Message).HasColumnName("message");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        // --- Config SavedVideo (✅ เพิ่มส่วนนี้ให้ครับ ไม่งั้น SavedVideo จะไม่ลง Schema) ---
        modelBuilder.Entity<SavedVideo>(entity => {
            entity.ToTable("saved_videos", schema);
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.YoutubeVideoId).HasColumnName("youtube_video_id");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.ThumbnailUrl).HasColumnName("thumbnail_url");
            entity.Property(e => e.PublishDate).HasColumnName("publish_date");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("CURRENT_TIMESTAMP");
        });
    }
}