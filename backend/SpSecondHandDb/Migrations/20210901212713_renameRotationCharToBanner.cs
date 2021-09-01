using Microsoft.EntityFrameworkCore.Migrations;

namespace SpSecondHandDb.Migrations
{
    public partial class renameRotationCharToBanner : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RotationChart",
                table: "RotationChart");

            migrationBuilder.RenameTable(
                name: "RotationChart",
                newName: "Banners");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Banners",
                table: "Banners",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Banners",
                table: "Banners");

            migrationBuilder.RenameTable(
                name: "Banners",
                newName: "RotationChart");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RotationChart",
                table: "RotationChart",
                column: "Id");
        }
    }
}
