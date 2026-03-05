using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace toptechcmmuniversalbackendapi.Migrations
{
    /// <inheritdoc />
    public partial class AddContactLog : Migration
    {
        /// <inheritdoc />
       protected override void Up(MigrationBuilder migrationBuilder)
{
    // =========================================================================
    // ❌ ส่วนที่ 1: ตารางที่มีอยู่แล้วใน DB (ให้ Comment ปิดทิ้งทั้งหมด)
    // =========================================================================

    /* // 1. ContactForms (มีแล้ว)
    migrationBuilder.CreateTable(
        name: "ContactForms",
        schema: "tt_toptech_inter_db",
        columns: table => new { ... },
        constraints: table => { table.PrimaryKey("PK_ContactForms", x => x.Id); });

    // 2. IntegrationConfigs (มีแล้ว)
    migrationBuilder.CreateTable(
        name: "IntegrationConfigs",
        schema: "tt_toptech_inter_db",
        columns: table => new { ... },
        constraints: table => { table.PrimaryKey("PK_IntegrationConfigs", x => x.Id); });

    // 3. ExampleTable1 (มีแล้ว)
    migrationBuilder.CreateTable(
        name: "ExampleTable1",
        schema: "tt_toptech_inter_db",
        columns: table => new { ... },
        constraints: table => { table.PrimaryKey("PK_ExampleTable1", x => x.ExampleTable1Id); });

    // 4. ตารางอื่นๆ เช่น room_state, playlist_queue, saved_videos ถ้ามีในโค้ดนี้ ให้ Comment ปิดให้หมดครับ
    */


    // =========================================================================
    // ✅ ส่วนที่ 2: ContactLogs (ตารางใหม่ที่ยังไม่มี -> ต้องเปิดไว้ห้ามลบ)
    // =========================================================================
    
    migrationBuilder.CreateTable(
        name: "ContactLogs", // 👈 เช็คตรงนี้ต้องเป็น ContactLogs
        schema: "tt_toptech_inter_db",
        columns: table => new
        {
            Id = table.Column<Guid>(type: "uuid", nullable: false),
            Name = table.Column<string>(type: "text", nullable: false),
            Email = table.Column<string>(type: "text", nullable: false),
            Phone = table.Column<string>(type: "text", nullable: false),
            Message = table.Column<string>(type: "text", nullable: false),
            CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
            // อาจมี Column อื่นๆ ตามที่คุณเขียนไว้ใน Entity
        },
        constraints: table =>
        {
            table.PrimaryKey("PK_ContactLogs", x => x.Id);
        });
}
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactForms",
                schema: "tt_toptech_inter_db");

            migrationBuilder.DropTable(
                name: "ContactLogs");

            migrationBuilder.DropTable(
                name: "IntegrationConfigs",
                schema: "tt_toptech_inter_db");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "tt_toptech_inter_db");
        }
    }
}
