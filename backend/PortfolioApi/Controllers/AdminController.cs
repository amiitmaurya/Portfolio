namespace PortfolioApi.Controllers
{
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.IdentityModel.Tokens;
    using PortfolioApi.Data;
    using PortfolioApi.DTOs;

    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly PortfolioDbContext _context;
        private readonly IConfiguration _config;

        public AdminController(PortfolioDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // POST: api/admin/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            if (string.IsNullOrWhiteSpace(login.Username) || string.IsNullOrWhiteSpace(login.Password))
            {
                return BadRequest(new { success = false, message = "User ID and Password are required." });
            }

            var admin = await _context.AdminUsers.FirstOrDefaultAsync(u => u.Username == login.Username);
            if (admin != null && admin.Password == login.Password)
            {
                var token = GenerateJwtToken(admin.Username);
                return Ok(new
                {
                    success = true,
                    token = token,
                    username = admin.Username,
                    message = "Login Successful"
                });
            }

            return Unauthorized(new { success = false, message = "Invalid User ID or Password." });
        }

        // POST: api/admin/change-password
        [HttpPost("change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.CurrentPassword) || string.IsNullOrWhiteSpace(dto.NewPassword))
            {
                return BadRequest(new { success = false, message = "Current Password and New Password are required." });
            }

            var username = dto.Username;
            if (string.IsNullOrWhiteSpace(username))
            {
                username = User.Identity?.Name;
            }

            var admin = await _context.AdminUsers.FirstOrDefaultAsync(u => u.Username == username);
            if (admin == null)
            {
                admin = await _context.AdminUsers.FirstOrDefaultAsync();
            }

            if (admin == null || admin.Password != dto.CurrentPassword)
            {
                return BadRequest(new { success = false, message = "Current password is incorrect." });
            }

            admin.Password = dto.NewPassword;
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Password updated successfully in SQL Server!" });
        }

        private string GenerateJwtToken(string username)
        {
            var key = _config["Jwt:Key"] ?? "Amit_Portfolio_Super_Secret_JWT_Key_2026_Secure!";
            var issuer = _config["Jwt:Issuer"] ?? "PortfolioApi";
            var audience = _config["Jwt:Audience"] ?? "PortfolioClient";

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, "Admin"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
