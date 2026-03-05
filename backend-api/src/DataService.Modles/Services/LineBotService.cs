using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using Microsoft.EntityFrameworkCore; // ✅ เพิ่ม namespace นี้สำหรับ EF Core
using TopTechInterBackend.DataService.Modles.DTOs;      // ✅ เปลี่ยนเป็น namespace ที่เก็บ DbContext ของคุณ
using TopTechInterBackend.DataService.Modles.Model;    // ✅ เปลี่ยนเป็น namespace ที่เก็บ Model AppSetting
using TopTechInterBackend.DataService.Modles;

namespace TopTechInterBackend.Services
{
    public class LineBotService : ILineBotService
    {
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;
        private readonly AppDbContext _dbContext; // ✅ เพิ่ม DbContext

        // ==========================================================
        // 🖼️ URL รูปภาพประกอบบริการ
        // ==========================================================
        private const string URL_MOBILE = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800";
        private const string URL_WEB = "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800";
        private const string URL_NETWORK = "https://images.unsplash.com/photo-1544197150-b99a580bbcbf?w=800";
        private const string URL_SECURITY = "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800";
        private const string URL_BACKUP = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800";
        private const string URL_SUPPORT = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800";

        // ✅ เก็บ Default Prompt ไว้กันเหนียว กรณีต่อ DB ไม่ติด หรือยังไม่ได้ตั้งค่า
        private const string DEFAULT_PROMPT = @"คุณคือ AI Assistant ของ Toptech Inter..."; 

        public LineBotService(
            IConfiguration config, 
            IHttpClientFactory httpClientFactory,
            AppDbContext dbContext) // ✅ Inject DbContext เข้ามา
        {
            _config = config;
            _httpClient = httpClientFactory.CreateClient();
            _dbContext = dbContext;
        }

        // ✅ ฟังก์ชันดึง Prompt จาก Database
        private async Task<string> GetSystemPromptAsync()
        {
            try 
            {
                // ค้นหา Setting ที่ชื่อ Key ว่า 'LineBot_SystemPrompt'
                var setting = await _dbContext.AppSettings
                                    .AsNoTracking() // อ่านอย่างเดียว เร็วขึ้น
                                    .FirstOrDefaultAsync(x => x.Key == "LineBot_SystemPrompt");

                if (setting != null && !string.IsNullOrEmpty(setting.Value))
                {
                    return setting.Value;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching prompt from DB: {ex.Message}");
            }

            // ถ้าหาไม่เจอ หรือ Error ให้ใช้ค่า Default เดิม
            return DEFAULT_PROMPT;
        }

        public async Task HandleWebhook(string requestBody, string signature)
        {
            var channelSecret = _config["LineConfig:ChannelSecret"] ?? "";
            
            if (string.IsNullOrEmpty(channelSecret))
            {
                Console.WriteLine("Error: ChannelSecret is missing.");
                return;
            }

            if (!VerifySignature(signature, requestBody, channelSecret)) throw new Exception("Invalid Signature");

            var json = JObject.Parse(requestBody);
            var events = json["events"];
            if (events == null || !events.HasValues) return;

            foreach (var ev in events)
            {
                var replyToken = ev["replyToken"]?.ToString();
                var type = ev["type"]?.ToString();
                object? responseMsg = null;

                if (type == "follow")
                {
                    responseMsg = CreateMainMenu("สวัสดีครับ! ยินดีต้อนรับสู่ TopTech Inter ✨\nผมเป็น AI ผู้ช่วยอัจฉริยะ สนใจบริการด้านไหนกดเลือกเมนูได้เลยครับ 👇");
                }
                else if (type == "message" && ev["message"]?["type"]?.ToString() == "text")
                {
                    string text = (ev["message"]?["text"]?.ToString() ?? "").Trim();
                    string textLower = text.ToLower();

                    if (textLower.Equals("เมนู") || textLower.Equals("menu"))
                    {
                        responseMsg = CreateMainMenu();
                    }
                    else
                    {
                        // ✅ เรียกฟังก์ชัน AI ที่ปรับปรุงใหม่
                        string aiReply = await GetGroqResponse(text);

                        if (!string.IsNullOrEmpty(aiReply))
                        {
                            string? selectedImage = null;
                            if (textLower.Contains("แอป") || textLower.Contains("app") || textLower.Contains("ios") || textLower.Contains("android")) selectedImage = URL_MOBILE;
                            else if (textLower.Contains("เว็บ") || textLower.Contains("web") || textLower.Contains("site")) selectedImage = URL_WEB;
                            else if (textLower.Contains("network") || textLower.Contains("wifi") || textLower.Contains("เน็ต")) selectedImage = URL_NETWORK;
                            else if (textLower.Contains("firewall") || textLower.Contains("security") || textLower.Contains("ความปลอดภัย")) selectedImage = URL_SECURITY;
                            else if (textLower.Contains("backup") || textLower.Contains("กู้ข้อมูล")) selectedImage = URL_BACKUP;
                            else if (textLower.Contains("ซ่อม") || textLower.Contains("support") || textLower.Contains("computer") || textLower.Contains("คอม")) selectedImage = URL_SUPPORT;

                            var backToMenu = new { items = new[] { new { type = "action", action = new { type = "message", label = "⬅️ กลับเมนูหลัก", text = "เมนู" } } } };
                            var messages = new List<object>();

                            if (selectedImage != null)
                            {
                                messages.Add(new { type = "image", originalContentUrl = selectedImage, previewImageUrl = selectedImage });
                            }
                            messages.Add(new { type = "text", text = aiReply, quickReply = backToMenu });

                            responseMsg = messages.ToArray();
                        }
                        else
                        {
                            responseMsg = CreateMainMenu("ขออภัยครับ ระบบกำลังประมวลผล เลือกหัวข้อจากเมนูแทนนะครับ 👇");
                        }
                    }
                }

                if (!string.IsNullOrEmpty(replyToken) && responseMsg != null)
                {
                    await ReplyMessage(replyToken, responseMsg);
                }
            }
        }

        private object CreateMainMenu(string headerText = "ต้องการสอบถามบริการด้านไหน เลือกได้เลยครับ 👇")
        {
            return new
            {
                type = "text",
                text = headerText,
                quickReply = new
                {
                    items = new object[]
                    {
                        new { type = "action", action = new { type = "message", label = "📱 Mobile App", text = "สนใจบริการทำ Mobile App" } },
                        new { type = "action", action = new { type = "message", label = "💻 Website", text = "สนใจบริการทำ Website" } },
                        new { type = "action", action = new { type = "message", label = "🌐 Network/WiFi", text = "สนใจวางระบบ Network" } },
                        new { type = "action", action = new { type = "message", label = "🛡️ Firewall", text = "สนใจระบบ Firewall" } },
                        new { type = "action", action = new { type = "message", label = "💾 Backup/DR", text = "สนใจระบบ Backup" } },
                        new { type = "action", action = new { type = "message", label = "🖥️ IT Support", text = "สนใจบริการ IT Support" } },
                        new { type = "action", action = new { type = "message", label = "❓ บริการทั้งหมด", text = "TopTech มีบริการอะไรบ้าง" } }
                    }
                }
            };
        }

        private async Task<string> GetGroqResponse(string userMessage)
        {
            var apiKey = _config["GroqConfig:ApiKey"] ?? "";
            if(string.IsNullOrEmpty(apiKey)) return "";

            // ✅ 1. ดึง System Prompt จาก Database
            string systemPrompt = await GetSystemPromptAsync();

            var url = "https://api.groq.com/openai/v1/chat/completions";

            var payload = new
            {
                model = "llama-3.3-70b-versatile",
                messages = new[]
                {
                    // ✅ 2. ใส่ค่าที่ดึงมาจาก DB ลงไปตรงนี้
                    new { role = "system", content = systemPrompt },
                    new { role = "user", content = userMessage }
                },
                temperature = 0.7,
                max_tokens = 500
            };

            var jsonContent = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            try
            {
                var response = await _httpClient.PostAsync(url, jsonContent);
                var responseString = await response.Content.ReadAsStringAsync();
                
                if (!response.IsSuccessStatusCode) return "";

                var jsonResponse = JObject.Parse(responseString);
                return jsonResponse["choices"]?[0]?["message"]?["content"]?.ToString() ?? "";
            }
            catch
            {
                return "";
            }
        }

        private async Task ReplyMessage(string replyToken, object messages)
        {
            var accessToken = _config["LineConfig:ChannelAccessToken"] ?? "";
            if(string.IsNullOrEmpty(accessToken)) return;

            var url = "https://api.line.me/v2/bot/message/reply";
            var msgArray = messages is Array ? messages : new[] { messages };
            var payload = new { replyToken = replyToken, messages = msgArray };
            
            var jsonContent = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            await _httpClient.PostAsync(url, jsonContent);
        }

        private bool VerifySignature(string signature, string body, string channelSecret)
        {
            if (string.IsNullOrEmpty(signature) || string.IsNullOrEmpty(channelSecret)) return false;
            var key = Encoding.UTF8.GetBytes(channelSecret);
            using var hmac = new HMACSHA256(key);
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(body));
            return Convert.ToBase64String(hash) == signature;
        }
    }
}