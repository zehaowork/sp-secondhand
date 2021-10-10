using Microsoft.EntityFrameworkCore.Migrations;

namespace SpSecondHandDb.Migrations
{
    public partial class addEnglishName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EnglishName",
                table: "Cities",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnglishName",
                table: "Cities");
        }
    }
}
