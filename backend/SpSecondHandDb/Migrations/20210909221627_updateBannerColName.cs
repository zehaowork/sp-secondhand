using Microsoft.EntityFrameworkCore.Migrations;

namespace SpSecondHandDb.Migrations
{
    public partial class updateBannerColName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sort",
                table: "Banners");

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Banners",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Order",
                table: "Banners");

            migrationBuilder.AddColumn<int>(
                name: "Sort",
                table: "Banners",
                type: "int",
                nullable: true);
        }
    }
}
