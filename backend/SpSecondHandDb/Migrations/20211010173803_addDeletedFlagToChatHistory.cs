using Microsoft.EntityFrameworkCore.Migrations;

namespace SpSecondHandDb.Migrations
{
    public partial class addDeletedFlagToChatHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "FromDeleted",
                table: "ChatHistories",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ToDeleted",
                table: "ChatHistories",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FromDeleted",
                table: "ChatHistories");

            migrationBuilder.DropColumn(
                name: "ToDeleted",
                table: "ChatHistories");
        }
    }
}
