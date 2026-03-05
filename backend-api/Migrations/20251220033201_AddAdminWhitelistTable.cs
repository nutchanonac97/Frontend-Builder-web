using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace toptechcmmuniversalbackendapi.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminWhitelistTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "AdminWhitelists",
                newName: "AdminWhitelists",
                newSchema: "tt_toptech_inter_db");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "AdminWhitelists",
                schema: "tt_toptech_inter_db",
                newName: "AdminWhitelists");
        }
    }
}
