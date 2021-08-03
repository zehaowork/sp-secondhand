using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SpSecondHandDb.Migrations
{
    public partial class AddFavoriteTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 32, nullable: true),
                    ImgUrl = table.Column<string>(maxLength: 128, nullable: true),
                    Sort = table.Column<int>(nullable: true),
                    ProjectID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ManageUser",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(maxLength: 32, nullable: true),
                    UserPwd = table.Column<string>(maxLength: 32, nullable: true),
                    SecretKey = table.Column<string>(maxLength: 6, nullable: true),
                    CreateTime = table.Column<DateTime>(type: "datetime", nullable: true),
                    RoleID = table.Column<int>(nullable: true),
                    IsDelete = table.Column<bool>(nullable: true),
                    IsLock = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ManageUser", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Region",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParentID = table.Column<int>(nullable: true),
                    Grade = table.Column<byte>(nullable: true),
                    Name = table.Column<string>(maxLength: 32, nullable: true),
                    IsUsed = table.Column<bool>(nullable: true),
                    IsDel = table.Column<bool>(nullable: true),
                    FirstLetter = table.Column<string>(unicode: false, maxLength: 1, nullable: true),
                    CountryID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Region", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "RotationChart",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImgUrl = table.Column<string>(maxLength: 128, nullable: true),
                    Sort = table.Column<int>(nullable: true),
                    ProjectID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RotationChart", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Second-Hand",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 32, nullable: true),
                    ImgUrl = table.Column<string>(maxLength: 128, nullable: true),
                    ImgsUrl = table.Column<string>(maxLength: 256, nullable: true),
                    Description = table.Column<string>(maxLength: 512, nullable: true),
                    WeChatID = table.Column<string>(maxLength: 32, nullable: true),
                    Telephone = table.Column<string>(maxLength: 16, nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18, 1)", nullable: true),
                    GoodType = table.Column<int>(nullable: true),
                    Address = table.Column<string>(maxLength: 64, nullable: true),
                    UserID = table.Column<int>(nullable: true),
                    ItemsID = table.Column<int>(nullable: true),
                    ProjectID = table.Column<int>(nullable: true),
                    CreateTime = table.Column<DateTime>(type: "datetime", nullable: true),
                    RegionID = table.Column<int>(nullable: true),
                    IsSale = table.Column<bool>(nullable: true),
                    Popularity = table.Column<long>(nullable: true, defaultValueSql: "((0))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Second-Hand", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OpenId = table.Column<string>(maxLength: 32, nullable: true),
                    NickName = table.Column<string>(maxLength: 16, nullable: true),
                    City = table.Column<string>(maxLength: 64, nullable: true),
                    Province = table.Column<string>(maxLength: 64, nullable: true),
                    Country = table.Column<string>(maxLength: 64, nullable: true),
                    Sex = table.Column<int>(nullable: true),
                    HeadImgUrl = table.Column<string>(maxLength: 256, nullable: true),
                    CreateTime = table.Column<DateTime>(type: "datetime", nullable: true),
                    Status = table.Column<int>(nullable: true),
                    ProjectID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.ID);
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
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChatHistory_User1",
                        column: x => x.ToUId,
                        principalTable: "User",
                        principalColumn: "ID",
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
                        name: "FK_Favorites_Second-Hand_SecondHandId",
                        column: x => x.SecondHandId,
                        principalTable: "Second-Hand",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Favorites_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserContact",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address1 = table.Column<string>(maxLength: 200, nullable: true),
                    Address2 = table.Column<string>(maxLength: 200, nullable: true),
                    Address3 = table.Column<string>(maxLength: 200, nullable: true),
                    UserId = table.Column<long>(nullable: true),
                    Telephone = table.Column<string>(maxLength: 50, nullable: true),
                    WeChatId = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserContact", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserContacts_User",
                        column: x => x.Id,
                        principalTable: "User",
                        principalColumn: "ID",
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
                name: "ManageUser");

            migrationBuilder.DropTable(
                name: "Region");

            migrationBuilder.DropTable(
                name: "RotationChart");

            migrationBuilder.DropTable(
                name: "UserContact");

            migrationBuilder.DropTable(
                name: "Second-Hand");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
