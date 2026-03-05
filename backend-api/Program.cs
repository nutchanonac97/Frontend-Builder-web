using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TopTechInterBackend.DataService.Modles.Services;
using TopTechInterBackend.DataService.Modles.Model;
using TopTechInterBackend.DataService.Modles;

var builder = WebApplication.CreateBuilder(args);

// ==================================================================
// 1. ลงทะเบียน Database Context (PostgreSQL)
// ==================================================================
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// ==================================================================
// 2. ลงทะเบียน Services (Dependency Injection)
// ==================================================================
builder.Services.AddHttpClient();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<ISocialAuthService, SocialAuthService>();
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddScoped<TopTechInterBackend.Services.ILineBotService, TopTechInterBackend.Services.LineBotService>();

// ==================================================================
// 3. ตั้งค่า JWT Authentication
// ==================================================================
var jwtSection = builder.Configuration.GetSection("JwtConfig");
var secretKey = jwtSection["Secret"] ?? "DefaultSecretKeyMustBeVeryLongToSecureTheToken123456";
var keyBytes = Encoding.ASCII.GetBytes(secretKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
});

// ==================================================================
// 4. ตั้งค่า CORS
// ==================================================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// ==================================================================
// 5. Standard Services
// ==================================================================
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailConfig"));

var app = builder.Build();

// ==================================================================
// 6. Middleware Pipeline
// ==================================================================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();