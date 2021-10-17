using Microsoft.EntityFrameworkCore;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Entities.HouseRent;

namespace SpSecondHandDb
{
    public class SpShDbContext : DbContext
    {
        public SpShDbContext(DbContextOptions<SpShDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ChatHistory> ChatHistories { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Banner> Banners { get; set; }
        public virtual DbSet<SecondHand> SecondHands { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserContact> UserContacts { get; set; }
        public virtual DbSet<Favorite> Favorites { get; set; }
        public virtual DbSet<RecommendedSearch> RecommendedSearches { get; set; }
        public virtual DbSet<Property> Properties { get; set; }

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

            modelBuilder.Entity<Favorite>().HasKey(f => new {f.UserId, f.SecondHandId});

            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.User)
                .WithMany(u => u.Favorites)
                .HasForeignKey(f => f.UserId);

            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.SecondHand)
                .WithMany(sh => sh.Favorites)
                .HasForeignKey(f => f.SecondHandId);
        }
    }
}
