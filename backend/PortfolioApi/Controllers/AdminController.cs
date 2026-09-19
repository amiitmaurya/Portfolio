namespace PortfolioApi.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using PortfolioApi.Data;
    using PortfolioApi.DTOs;

   
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
       
        private readonly PortfolioDbContext _context;

        
        public AdminController(PortfolioDbContext context)
        {
            _context = context;
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
                return Ok(new
                {
                    success = true,
                    token = "admin_jwt_session_token_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(),
                    username = admin.Username,
                    message = "Admin Login Successful (SQL Server)"
                });
            }

            return Unauthorized(new { success = false, message = "Invalid User ID or Password." });
        }

        // POST: api/admin/change-password

        
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Username) ||
                string.IsNullOrWhiteSpace(dto.CurrentPassword) ||
                string.IsNullOrWhiteSpace(dto.NewPassword))
            {
                return BadRequest(new { success = false, message = "All fields are required." });
            }

            var admin = await _context.AdminUsers.FirstOrDefaultAsync(u => u.Username == dto.Username);
            if (admin == null || admin.Password != dto.CurrentPassword)
            {
                return BadRequest(new { success = false, message = "Current password is incorrect." });
            }

            admin.Password = dto.NewPassword;
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Password updated successfully in SQL Server!" });
        }
    }
}
