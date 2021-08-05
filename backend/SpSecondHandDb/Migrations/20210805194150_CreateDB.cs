using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SpSecondHandDb.Migrations
{
    public partial class CreateDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    ImgUrl = table.Column<string>(nullable: true),
                    Sort = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Region",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    FirstLetter = table.Column<string>(nullable: true),
                    CountryId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Region", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RotationChart",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImgUrl = table.Column<string>(nullable: true),
                    Sort = table.Column<int>(nullable: true),
                    Link = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RotationChart", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SecondHand",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    ImgUrls = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    WeChatId = table.Column<string>(nullable: true),
                    Telephone = table.Column<string>(nullable: true),
                    Price = table.Column<decimal>(nullable: true),
                    Type = table.Column<int>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: true),
                    CategoryId = table.Column<int>(nullable: true),
                    PublishTime = table.Column<DateTime>(nullable: true),
                    CityId = table.Column<int>(nullable: true),
                    IsSold = table.Column<bool>(nullable: true),
                    Popularity = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SecondHand", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OpenId = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Gender = table.Column<int>(nullable: true),
                    ProfileImgUrl = table.Column<string>(nullable: true),
                    JoinTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChatHistory",
                columns: table => new
                {
                    MessageId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FromUId = table.Column<long>(nullable: false),
                    ToUId = table.Column<long>(nullable: false),
                    Message = table.Column<string>(maxLength: 2000, nullable: true),
                    Time = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsRead = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatHistory", x => x.MessageId);
                    table.ForeignKey(
                        name: "FK_ChatHistory_User",
                        column: x => x.FromUId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChatHistory_User1",
                        column: x => x.ToUId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Favorites",
                columns: table => new
                {
                    UserId = table.Column<long>(nullable: false),
                    SecondHandId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorites", x => new { x.UserId, x.SecondHandId });
                    table.ForeignKey(
                        name: "FK_Favorites_SecondHand_SecondHandId",
                        column: x => x.SecondHandId,
                        principalTable: "SecondHand",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Favorites_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserContact",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address1 = table.Column<string>(nullable: true),
                    Address2 = table.Column<string>(nullable: true),
                    Address3 = table.Column<string>(nullable: true),
                    UserId = table.Column<long>(nullable: true),
                    Telephone = table.Column<string>(nullable: true),
                    WeChatId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserContact", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserContact_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChatHistory_FromUId",
                table: "ChatHistory",
                column: "FromUId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatHistory_ToUId",
                table: "ChatHistory",
                column: "ToUId");

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_SecondHandId",
                table: "Favorites",
                column: "SecondHandId");

            migrationBuilder.CreateIndex(
                name: "IX_UserContact_UserId",
                table: "UserContact",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChatHistory");

            migrationBuilder.DropTable(
                name: "Favorites");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Region");

            migrationBuilder.DropTable(
                name: "RotationChart");

            migrationBuilder.DropTable(
                name: "UserContact");

            migrationBuilder.DropTable(
                name: "SecondHand");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
