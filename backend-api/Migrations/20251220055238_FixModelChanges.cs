using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace toptechcmmuniversalbackendapi.Migrations
{
    /// <inheritdoc />
    public partial class FixModelChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "AppSettings",
                newName: "AppSettings",
                newSchema: "tt_toptech_inter_db");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "AppSettings",
                schema: "tt_toptech_inter_db",
                newName: "AppSettings");
        }
    }
}
