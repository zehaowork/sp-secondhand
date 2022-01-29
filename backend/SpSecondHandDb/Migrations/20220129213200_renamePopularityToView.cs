using Microsoft.EntityFrameworkCore.Migrations;

namespace SpSecondHandDb.Migrations
{
    public partial class renamePopularityToView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Popularity",
                table: "SecondHands");

            migrationBuilder.AddColumn<long>(
                name: "View",
                table: "SecondHands",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "View",
                table: "SecondHands");

            migrationBuilder.AddColumn<long>(
                name: "Popularity",
                table: "SecondHands",
                type: "bigint",
                nullable: true);
        }
    }
}
