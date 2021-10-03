using Microsoft.EntityFrameworkCore.Migrations;

namespace SpSecondHandDb.Migrations
{
    public partial class changeTypeToCondition : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "SecondHands");

            migrationBuilder.AddColumn<int>(
                name: "Condition",
                table: "SecondHands",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Condition",
                table: "SecondHands");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "SecondHands",
                type: "int",
                nullable: true);
        }
    }
}
