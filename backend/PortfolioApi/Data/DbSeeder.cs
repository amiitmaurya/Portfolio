namespace PortfolioApi.Data
{
    using PortfolioApi.Models;

    /// <summary>
    /// Database Seeder to initialize required initial database records.
    /// </summary>
    public static class DbSeeder
    {
        public static void Seed(PortfolioDbContext context)
        {
            context.Database.EnsureCreated();

            // Seed Admin User
            var existingAdmin = context.AdminUsers.FirstOrDefault();
            if (existingAdmin == null)
            {
                context.AdminUsers.Add(new AdminUser
                {
                    Username = "Amit",
                    Password = "Amit@2026"
                });
                context.SaveChanges();
            }
            else
            {
                existingAdmin.Username = "Amit";
                existingAdmin.Password = "Amit@2026";
                context.SaveChanges();
            }
        }
    }
}
