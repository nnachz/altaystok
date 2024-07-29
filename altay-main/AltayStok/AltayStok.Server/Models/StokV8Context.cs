using Microsoft.EntityFrameworkCore;
using StockManagementAPI.Models;

namespace AltayStok.Server.Models
{
    public partial class StokV8Context : DbContext
    {
        public StokV8Context(DbContextOptions<StokV8Context> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Urunler> Urunler { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PasswordHash)
                    .IsRequired();

                entity.Property(e => e.Salt)
                    .IsRequired();

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Urunler>(entity =>
            {
                entity.HasKey(e => e.UrunId);

                entity.Property(e => e.UrunAdi)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.UrunKodu)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Kategori)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
