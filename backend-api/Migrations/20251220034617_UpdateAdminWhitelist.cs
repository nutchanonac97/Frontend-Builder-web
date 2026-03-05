using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace toptechcmmuniversalbackendapi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAdminWhitelist : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AddedAt",
                schema: "tt_toptech_inter_db",
                table: "AdminWhitelists",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                schema: "tt_toptech_inter_db",
                table: "AdminWhitelists",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "RevokedAt",
                schema: "tt_toptech_inter_db",
                table: "AdminWhitelists",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddedAt",
                schema: "tt_toptech_inter_db",
                table: "AdminWhitelists");

            migrationBuilder.DropColumn(
                name: "IsActive",
                schema: "tt_toptech_inter_db",
                table: "AdminWhitelists");

            migrationBuilder.DropColumn(
                name: "RevokedAt",
                schema: "tt_toptech_inter_db",
                table: "AdminWhitelists");
        }
    }
}
