using Microsoft.EntityFrameworkCore;

namespace ToptechCmmUniversalBackendApi.MediaService.LiveRoomService.LiveRoom;

public class LiveRoomDbContext : DbContext
{
    public LiveRoomDbContext(DbContextOptions<LiveRoomDbContext> options) : base(options) { }

    public DbSet<RoomState> RoomStates { get; set; }
    public DbSet<PlaylistQueue> PlaylistQueues { get; set; }
    public DbSet<RoomComment> RoomComments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // กำหนด Schema หลักของระบบ
        string schema = "tt_toptech_inter_db";

        // --------------------------------------------------------
        // 1. Config ตาราง RoomState (สถานะห้อง/จอใหญ่)
        // --------------------------------------------------------
        modelBuilder.Entity<RoomState>(entity => {
            entity.ToTable("room_state", schema);
            
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            
            entity.Property(e => e.YoutubeVideoId).HasColumnName("current_youtube_id");
            entity.Property(e => e.VideoTitle).HasColumnName("video_title");
            entity.Property(e => e.CasterName).HasColumnName("caster_name");
            entity.Property(e => e.IsLive).HasColumnName("is_live");
            
            // ✅ เพิ่ม ViewerCount (สำคัญ)
            entity.Property(e => e.ViewerCount)
                  .HasColumnName("viewer_count")
                  .HasDefaultValue(0); 

            entity.Property(e => e.UpdatedAt)
                  .HasColumnName("updated_at")
                  .HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        // --------------------------------------------------------
        // 2. Config ตาราง PlaylistQueue (คิวเพลง)
        // --------------------------------------------------------
        modelBuilder.Entity<PlaylistQueue>(entity => {
            entity.ToTable("playlist_queue", schema);
            
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            
            entity.Property(e => e.YoutubeId).HasColumnName("youtube_id");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.ThumbnailUrl).HasColumnName("thumbnail");
            entity.Property(e => e.OrderIndex).HasColumnName("order_index");
            
            // ✅ เพิ่ม DurationSeconds (สำคัญ)
            entity.Property(e => e.DurationSeconds)
                  .HasColumnName("duration_seconds")
                  .HasDefaultValue(0);

            entity.Property(e => e.AddedAt)
                  .HasColumnName("added_at")
                  .HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        // --------------------------------------------------------
        // 3. Config ตาราง RoomComment (คอมเมนต์)
        // --------------------------------------------------------
        modelBuilder.Entity<RoomComment>(entity => {
            entity.ToTable("room_comments", schema);
            
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            
            entity.Property(e => e.UserName).HasColumnName("user_name");
            entity.Property(e => e.Message).HasColumnName("message");
            
            entity.Property(e => e.CreatedAt)
                  .HasColumnName("created_at")
                  .HasDefaultValueSql("CURRENT_TIMESTAMP");
        });
    }
}