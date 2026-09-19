namespace PortfolioApi.Data
{
    using Microsoft.EntityFrameworkCore;
    using PortfolioApi.Models;

    
    public class PortfolioDbContext : DbContext
    {
        
        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options)
        {
        }

        
        public DbSet<AdminUser> AdminUsers { get; set; } = null!;

       
        public DbSet<PortfolioStat> Stats { get; set; } = null!;

        
        public DbSet<ContactMessage> Messages { get; set; } = null!;

        
        public DbSet<PortfolioContent> Contents { get; set; } = null!;

        /// <inheritdoc/>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AdminUser>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<PortfolioStat>()
                .HasIndex(s => s.Key)
                .IsUnique();

            modelBuilder.Entity<PortfolioContent>()
                .HasIndex(c => c.Key)
                .IsUnique();
        }
    }
}
