using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace toptechcmmuniversalbackendapi.Migrations
{
    /// <inheritdoc />
    public partial class AddContactLogProjectTypeBudget : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                schema: "tt_toptech_inter_db",
                table: "ContactLogs",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                schema: "tt_toptech_inter_db",
                table: "ContactLogs",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                schema: "tt_toptech_inter_db",
                table: "ContactLogs",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "Budget",
                schema: "tt_toptech_inter_db",
                table: "ContactLogs",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectType",
                schema: "tt_toptech_inter_db",
                table: "ContactLogs",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Budget",
                schema: "tt_toptech_inter_db",
                table: "ContactLogs");

            migrationBuilder.DropColumn(
                name: "ProjectType",
                schema: "tt_toptech_inter_db",
                table: "ContactLogs");

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                schema: "tt_toptech_inter_db",
                table: "ContactLogs",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                schema: "tt_toptech_inter_db",
                table: "ContactLogs",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                schema: "tt_toptech_inter_db",
                table: "ContactLogs",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
