using Microsoft.EntityFrameworkCore.Migrations;

namespace SpSecondHandDb.Migrations
{
    public partial class renameItemToCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImgUrl",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Sort",
                table: "Items");

            migrationBuilder.AddColumn<string>(
                name: "LogoUrl",
                table: "Items",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Items",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LogoUrl",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "Items");

            migrationBuilder.AddColumn<string>(
                name: "ImgUrl",
                table: "Items",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Sort",
                table: "Items",
                type: "int",
                nullable: true);
        }
    }
}
