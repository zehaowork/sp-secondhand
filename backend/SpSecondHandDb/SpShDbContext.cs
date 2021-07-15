using Microsoft.EntityFrameworkCore;
using SpSecondHandDb.Entities;

namespace SpSecondHandDb
{
    public class SpShDbContext : DbContext
    {
        public SpShDbContext(DbContextOptions<SpShDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ChatHistory> ChatHistory { get; set; }
        public virtual DbSet<Items> Items { get; set; }
        public virtual DbSet<ManageUser> ManageUser { get; set; }
        public virtual DbSet<Region> Region { get; set; }
        public virtual DbSet<RotationChart> RotationChart { get; set; }
        public virtual DbSet<SecondHand> SecondHand { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserContact> UserContact { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChatHistory>(entity =>
            {
                entity.HasKey(e => e.MessageId);

                entity.Property(e => e.FromUid).HasColumnName("FromUId");

                entity.Property(e => e.Message).HasMaxLength(2000);

                entity.Property(e => e.Time).HasColumnType("datetime");

                entity.Property(e => e.ToUid).HasColumnName("ToUId");

                entity.HasOne(d => d.FromU)
                    .WithMany(p => p.ChatHistoryFromU)
                    .HasForeignKey(d => d.FromUid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChatHistory_User");

                entity.HasOne(d => d.ToU)
                    .WithMany(p => p.ChatHistoryToU)
                    .HasForeignKey(d => d.ToUid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChatHistory_User1");
            });

            modelBuilder.Entity<Items>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ImgUrl).HasMaxLength(128);

                entity.Property(e => e.Name).HasMaxLength(32);

                entity.Property(e => e.ProjectId).HasColumnName("ProjectID");
            });

            modelBuilder.Entity<ManageUser>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreateTime).HasColumnType("datetime");

                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.Property(e => e.SecretKey).HasMaxLength(6);

                entity.Property(e => e.UserName).HasMaxLength(32);

                entity.Property(e => e.UserPwd).HasMaxLength(32);
            });

            modelBuilder.Entity<Region>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.FirstLetter)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Name).HasMaxLength(32);

                entity.Property(e => e.ParentId).HasColumnName("ParentID");
            });

            modelBuilder.Entity<RotationChart>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ImgUrl).HasMaxLength(128);

                entity.Property(e => e.ProjectId).HasColumnName("ProjectID");
            });

            modelBuilder.Entity<SecondHand>(entity =>
            {
                entity.ToTable("Second-Hand");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address).HasMaxLength(64);

                entity.Property(e => e.CreateTime).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(512);

                entity.Property(e => e.ImgUrl).HasMaxLength(128);

                entity.Property(e => e.ImgsUrl).HasMaxLength(256);

                entity.Property(e => e.ItemsId).HasColumnName("ItemsID");

                entity.Property(e => e.Popularity).HasDefaultValueSql("((0))");

                entity.Property(e => e.Price).HasColumnType("decimal(18, 1)");

                entity.Property(e => e.ProjectId).HasColumnName("ProjectID");

                entity.Property(e => e.RegionId).HasColumnName("RegionID");

                entity.Property(e => e.Telephone).HasMaxLength(16);

                entity.Property(e => e.Title).HasMaxLength(32);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.WeChatId)
                    .HasColumnName("WeChatID")
                    .HasMaxLength(32);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.City).HasMaxLength(64);

                entity.Property(e => e.Country).HasMaxLength(64);

                entity.Property(e => e.CreateTime).HasColumnType("datetime");

                entity.Property(e => e.HeadImgUrl).HasMaxLength(256);

                entity.Property(e => e.NickName).HasMaxLength(16);

                entity.Property(e => e.OpenId).HasMaxLength(32);

                entity.Property(e => e.ProjectId).HasColumnName("ProjectID");

                entity.Property(e => e.Province).HasMaxLength(64);
            });

            modelBuilder.Entity<UserContact>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Address1).HasMaxLength(200);

                entity.Property(e => e.Address2).HasMaxLength(200);

                entity.Property(e => e.Address3).HasMaxLength(200);

                entity.Property(e => e.Telephone).HasMaxLength(50);

                entity.Property(e => e.WeChatId).HasMaxLength(100);

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.UserContact)
                    .HasForeignKey<UserContact>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserContacts_User");
            });
        }
    }
}
