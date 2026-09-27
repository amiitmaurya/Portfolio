using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add controllers
builder.Services.AddControllers();

// Register SQL Server DbContext (SSMS)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Server=.;Database=PortfolioDb;Trusted_Connection=True;TrustServerCertificate=True;";

builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseSqlServer(connectionString));

// Configure CORS for decoupled Angular & React frontends (http://localhost:4200 & http://localhost:5173)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowCors", policy =>
    {
        policy.SetIsOriginAllowed(_ => true)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Configure Swagger / OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Auto Migrate / Ensure DB Created and Seed Master Resume Data to SQL Server
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
    try
    {
        DbSeeder.Seed(dbContext);
        Console.WriteLine("--> SQL Server PortfolioDb initialized & seeded successfully!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"--> SQL Server Database Seeding Warning: {ex.Message}");
    }
}

// Enable Swagger UI in all environments
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Portfolio API v1");
    c.RoutePrefix = "swagger";
});

// Enable CORS Policy
app.UseCors("AllowCors");
app.UseAuthorization();
app.MapControllers();

// Redirect root URL / to Swagger UI
app.MapGet("/", () => Results.Redirect("/swagger"));

app.Run();
