using Microsoft.EntityFrameworkCore;
// 👇 เช็คดูว่าไฟล์ User.cs ของคุณ namespace อะไร (ปกติใช้อันใดอันหนึ่ง)
using TopTechInterBackend.DataService.Modles.Model;
// using TopTechInterBackend.DataService.Modles.Model; // ถ้า User อยู่ในนี้ ให้เปิดบรรทัดนี้แล้วปิดบรรทัดบน


namespace TopTechInterBackend.DataService.Modles // 👈 จำ Namespace นี้ไว้นะครับ
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // ✅ ตารางต่างๆ ใน Database
        public DbSet<ContactForm> ContactForms { get; set; }
        public DbSet<IntegrationConfig> IntegrationConfigs { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<AdminWhitelist> AdminWhitelists { get; set; }
        public DbSet<AppSettings> AppSettings { get; set; }
        public DbSet<EmailSettings> EmailSettings { get; set; }


        // ในไฟล์ AppDbContext.cs
        public DbSet<ContactLog> ContactLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}