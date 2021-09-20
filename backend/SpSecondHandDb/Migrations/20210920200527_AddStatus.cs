using Microsoft.EntityFrameworkCore.Migrations;

namespace SpSecondHandDb.Migrations
{
    public partial class AddStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSold",
                table: "SecondHands");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "SecondHands",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "SecondHands");

            migrationBuilder.AddColumn<bool>(
                name: "IsSold",
                table: "SecondHands",
                type: "bit",
                nullable: true);
        }
    }
}
