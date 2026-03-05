using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace toptechcmmuniversalbackendapi.Migrations
{
    /// <inheritdoc />
    public partial class AddIntegrationConfigTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // -----------------------------------------------------------------------
            // 🛑 แก้ปัญหา Error: relation "IntegrationConfigs" already exists
            // ผมใส่เครื่องหมาย /* ... */ ครอบไว้ เพื่อให้ข้ามการสร้างตารางนี้ไปก่อน
            // เพราะใน Database จริงของคุณมีตารางนี้อยู่แล้ว
            // -----------------------------------------------------------------------

            /* migrationBuilder.CreateTable(
                name: "IntegrationConfigs",
                schema: "tt_toptech_inter_db",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ConfigKey = table.Column<string>(type: "text", nullable: false),
                    ConfigValue = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IntegrationConfigs", x => x.Id);
                });
            */
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // ส่วนขาลง (Rollback) ปล่อยไว้เหมือนเดิมได้ หรือจะคอมเมนต์ด้วยก็ได้ถ้ากลัวข้อมูลหาย
            migrationBuilder.DropTable(
                name: "IntegrationConfigs",
                schema: "tt_toptech_inter_db");
        }
    }
}