using Microsoft.EntityFrameworkCore.Migrations;

namespace SpSecondHandDb.Migrations
{
    public partial class MakeViewNotNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "View",
                table: "SecondHands",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "View",
                table: "SecondHands",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));
        }
    }
}
