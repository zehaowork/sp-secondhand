﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SpSecondHandDb;

namespace SpSecondHandDb.Migrations
{
    [DbContext(typeof(SpShDbContext))]
    [Migration("20210901210437_renameItem")]
    partial class renameItem
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.17")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SpSecondHandDb.Entities.Banner", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ImgUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Link")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Sort")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("RotationChart");
                });

            modelBuilder.Entity("SpSecondHandDb.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LogoUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Order")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("SpSecondHandDb.Entities.ChatHistory", b =>
                {
                    b.Property<long>("MessageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("FromUid")
                        .HasColumnName("FromUId")
                        .HasColumnType("bigint");

                    b.Property<bool>("IsRead")
                        .HasColumnType("bit");

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(2000)")
                        .HasMaxLength(2000);

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime");

                    b.Property<long>("ToUid")
                        .HasColumnName("ToUId")
                        .HasColumnType("bigint");

                    b.HasKey("MessageId");

                    b.HasIndex("FromUid");

                    b.HasIndex("ToUid");

                    b.ToTable("ChatHistory");
                });

            modelBuilder.Entity("SpSecondHandDb.Entities.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CountryId")
                        .HasColumnType("int");

                    b.Property<string>("FirstLetter")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Region");
                });

            modelBuilder.Entity("SpSecondHandDb.Entities.Favorite", b =>
                {
                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.Property<int>("SecondHandId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "SecondHandId");

                    b.HasIndex("SecondHandId");

                    b.ToTable("Favorites");
                });

            modelBuilder.Entity("SpSecondHandDb.Entities.SecondHand", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.Property<int?>("CityId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImgUrls")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("IsSold")
                        .HasColumnType("bit");

                    b.Property<long?>("Popularity")
                        .HasColumnType("bigint");

                    b.Property<decimal?>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime?>("PublishTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Telephone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Type")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("WeChatId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("SecondHand");
                });

            modelBuilder.Entity("SpSecondHandDb.Entities.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Gender")
                        .HasColumnType("int");

                    b.Property<DateTime?>("JoinTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("OpenId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfileImgUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("SpSecondHandDb.Entities.UserContact", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Address2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Address3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telephone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.Property<string>("WeChatId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique()
                        .HasFilter("[UserId] IS NOT NULL");

                    b.ToTable("UserContact");
                });

            modelBuilder.Entity("SpSecondHandDb.Entities.ChatHistory", b =>
                {
                    b.HasOne("SpSecondHandDb.Entities.User", "FromU")
                        .WithMany("ChatHistoryFromU")
                        .HasForeignKey("FromUid")
                        .HasConstraintName("FK_ChatHistory_User")
                        .IsRequired();

                    b.HasOne("SpSecondHandDb.Entities.User", "ToU")
                        .WithMany("ChatHistoryToU")
                        .HasForeignKey("ToUid")
                        .HasConstraintName("FK_ChatHistory_User1")
                        .IsRequired();
                });

            modelBuilder.Entity("SpSecondHandDb.Entities.Favorite", b =>
                {
                    b.HasOne("SpSecondHandDb.Entities.SecondHand", "SecondHand")
                        .WithMany("Favorites")
                        .HasForeignKey("SecondHandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SpSecondHandDb.Entities.User", "User")
                        .WithMany("Favorites")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SpSecondHandDb.Entities.UserContact", b =>
                {
                    b.HasOne("SpSecondHandDb.Entities.User", "User")
                        .WithOne("UserContact")
                        .HasForeignKey("SpSecondHandDb.Entities.UserContact", "UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
