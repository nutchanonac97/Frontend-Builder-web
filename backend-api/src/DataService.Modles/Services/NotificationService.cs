using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq; // ใช้สำหรับอ่าน JSON ตอนทำ OAuth
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json; // 👈 เพิ่มตัวนี้เข้ามาเพื่อสร้าง JSON ส่งไป Messaging API
using System.Threading.Tasks;

// 👇 เรียกใช้ Model และ Context
using TopTechInterBackend.DataService.Modles.Model; 
using TopTechInterBackend.DataService.Modles;

namespace TopTechInterBackend.DataService.Modles.Services;

public interface INotificationService
{
    Task<string> GetAuthUrlAsync(string provider);
    Task<bool> ExchangeTokenAsync(string provider, string code);
    Task ProcessContactFormAsync(ContactForm form);
}

public class NotificationService : INotificationService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;
    private readonly HttpClient _httpClient;

    public NotificationService(AppDbContext context, IConfiguration config, IHttpClientFactory httpClientFactory)
    {
        _context = context;
        _config = config;
        _httpClient = httpClientFactory.CreateClient();
    }

    public async Task<string> GetAuthUrlAsync(string provider)
    {
        var configEntity = await _context.IntegrationConfigs.FirstOrDefaultAsync(x => x.ProviderName == provider.ToUpper());
        
        if (configEntity == null) return ""; 
        
        string callbackUrl = _config["SocialAuth:RedirectBaseUrl"] ?? "";

        // หมายเหตุ: LINE Notify ปิดให้บริการแล้ว ส่วนนี้อาจไม่ได้ใช้ แต่คงไว้เผื่อ Login
        if (provider.ToUpper() == "LINE")
        {
            return $"https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id={configEntity.ClientId}&redirect_uri={callbackUrl}&state=NO_STATE&scope=profile%20openid";
        }
        else if (provider.ToUpper() == "FACEBOOK")
        {
            return $"https://www.facebook.com/v18.0/dialog/oauth?client_id={configEntity.ClientId}&redirect_uri={callbackUrl}&scope=pages_messaging,pages_show_list";
        }
        
        return "";
    }

    public async Task<bool> ExchangeTokenAsync(string provider, string code)
    {
        var configEntity = await _context.IntegrationConfigs.FirstOrDefaultAsync(x => x.ProviderName == provider.ToUpper());
        if (configEntity == null) return false;

        string redirectUrl = _config["SocialAuth:RedirectBaseUrl"] ?? "";

        if (provider.ToUpper() == "LINE")
        {
            // (โค้ดส่วนนี้สำหรับการขอ Token แบบ OAuth Login ซึ่งต่างจาก Messaging API)
            // แต่ถ้าคุณใช้ Channel Access Token แบบ Long-lived ที่ใส่ใน DB เอง ส่วนนี้จะไม่ถูกเรียกใช้งาน
            return true; 
        }
        else if (provider.ToUpper() == "FACEBOOK")
        {
            string url = $"https://graph.facebook.com/v18.0/oauth/access_token?client_id={configEntity.ClientId}&redirect_uri={redirectUrl}&client_secret={configEntity.ClientSecret}&code={code}";
            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode) return false;

            var jsonString = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(jsonString);
            string userAccessToken = json["access_token"]?.ToString() ?? "";

            configEntity.AccessToken = userAccessToken; 
            configEntity.IsActive = true;
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }

    // 👇 จุดที่แก้ไขสำคัญที่สุด: เปลี่ยนจาก Notify เป็น Messaging API
    public async Task ProcessContactFormAsync(ContactForm form)
    {
        // 1. บันทึกข้อมูลลง Database ก่อน
        _context.ContactForms.Add(form);
        await _context.SaveChangesAsync(); // Save เพื่อให้ได้ CreatedAt หรือ ID

        // 2. สร้างข้อความที่จะส่ง
        string messageBody = $"ลูกค้าติดต่อใหม่! 🚨\nชื่อ: {form.FullName}\nโทร: {form.PhoneNumber}\nข้อความ: {form.Message}";

        // 3. ดึง Config ของ LINE (Messaging API)
        var lineConfig = await _context.IntegrationConfigs.FirstOrDefaultAsync(x => x.ProviderName == "LINE" && x.IsActive);
        
        if (lineConfig != null && !string.IsNullOrEmpty(lineConfig.AccessToken))
        {
            try 
            {
                // สร้าง Payload เป็น JSON ตามมาตรฐาน Messaging API
                // เราใช้ field 'ClientId' ใน DB เพื่อเก็บ 'UserID' ปลายทาง
                var payload = new
                {
                    to = lineConfig.ClientId, 
                    messages = new[]
                    {
                        new { type = "text", text = messageBody }
                    }
                };

                var jsonPayload = System.Text.Json.JsonSerializer.Serialize(payload);
                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                // ตั้งค่า Header
                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", lineConfig.AccessToken);
                
                // ยิงไปที่ Endpoint ใหม่ (Push Message)
                var response = await _httpClient.PostAsync("https://api.line.me/v2/bot/message/push", content);
                
                if (response.IsSuccessStatusCode)
                {
                    form.SentStatus = "SENT_LINE_API";
                }
                else
                {
                    // อ่าน Error เผื่อ Debug
                    var errorMsg = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"LINE Error: {errorMsg}");
                    form.SentStatus = "FAILED_LINE_API";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                form.SentStatus = "ERROR_EXCEPTION";
            }
        }
        else
        {
            form.SentStatus = "NO_TOKEN";
        }

        // 4. อัปเดตสถานะการส่งกลับลง Database
        _context.ContactForms.Update(form);
        await _context.SaveChangesAsync();
    }
}