using Microsoft.EntityFrameworkCore;
using OptiPackBackend.Models;

namespace OptiPackBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<Box> Boxes => Set<Box>();
        public DbSet<ProtectiveMaterial> ProtectiveMaterials => Set<ProtectiveMaterial>();
        public DbSet<InventoryItem> InventoryItems => Set<InventoryItem>();
       //ublic DbSet<PackageHistory> PackageHistories => Set<PackageHistory>();
       public DbSet<PackageHistory> PackageHistories { get; set; }

        public DbSet<Recommendation> Recommendations => Set<Recommendation>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Fix decimal precision warnings
            modelBuilder.Entity<Box>().Property(b => b.CostPerBox).HasPrecision(18, 2);
            modelBuilder.Entity<ProtectiveMaterial>().Property(p => p.UnitCost).HasPrecision(18,2);
            modelBuilder.Entity<PackageHistory>().Property(h => h.Cost).HasPrecision(18,2);
            // other model config as needed
        }
    }
}
