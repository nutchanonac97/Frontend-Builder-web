using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.EntityFrameworkCore;
using TopTechInterBackend.DataService.Modles.DTOs;
using TopTechInterBackend.DataService.Modles; // ตรวจสอบ Namespace ของ AppDbContext ให้ตรงกับของคุณ

namespace TopTechInterBackend.DataService.Modles.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailRequest request);
    }

    public class EmailService : IEmailService
    {
        private readonly AppDbContext _context;

        public EmailService(AppDbContext context)
        {
            _context = context;
        }

        public async Task SendEmailAsync(EmailRequest request)
        {
            // ✅ 1. ดึงค่า Config สดๆ จาก Database
            var smtpHost = await GetConfigValue("Email:SmtpHost") ?? "smtp.gmail.com";
            var smtpPortStr = await GetConfigValue("Email:SmtpPort") ?? "587";
            var senderEmail = await GetConfigValue("Email:Username");
            var senderPassword = await GetConfigValue("Email:Password");

            int.TryParse(smtpPortStr, out int smtpPort);

            // เช็คความปลอดภัย
            if (string.IsNullOrEmpty(senderEmail) || string.IsNullOrEmpty(senderPassword))
            {
                throw new Exception("❌ ไม่พบการตั้งค่า Email (Username/Password) ใน Database กรุณาตรวจสอบตาราง IntegrationConfigs");
            }

            // ✅ 2. สร้าง Email Message
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("TopTech Admin", senderEmail));
            message.To.Add(new MailboxAddress("", request.ToEmail));
            message.Subject = request.Subject;

            var bodyBuilder = new BodyBuilder();
            if (request.IsHtml)
            {
                bodyBuilder.HtmlBody = request.Body;
            }
            else
            {
                bodyBuilder.TextBody = request.Body;
            }

            message.Body = bodyBuilder.ToMessageBody();

            // ✅ 3. เชื่อมต่อ SMTP และส่ง
            using (var client = new SmtpClient())
            {
                try
                {
                    // สำหรับ Gmail ใช้ StartTls
                    await client.ConnectAsync(smtpHost, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync(senderEmail, senderPassword);
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }
                catch (Exception ex)
                {
                    // โยน Error กลับไปให้ Controller รับทราบ
                    throw new Exception($"การส่งอีเมลล้มเหลว: {ex.Message}");
                }
            }
        }

        // Helper: ดึงค่าจาก DB
        private async Task<string?> GetConfigValue(string key)
        {
            var config = await _context.IntegrationConfigs
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.ConfigKey == key);
            
            return config?.ConfigValue;
        }
    }
}