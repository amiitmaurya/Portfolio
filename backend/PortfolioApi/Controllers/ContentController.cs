namespace PortfolioApi.Controllers
{
    using System.Text.Json;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using PortfolioApi.Data;
    using PortfolioApi.Models;

    [ApiController]
    [Route("api/content")]
    public class ContentController : ControllerBase
    {
        private readonly PortfolioDbContext _context;

        public ContentController(PortfolioDbContext context)
        {
            _context = context;
        }

        // GET: api/content
        [HttpGet]
        public async Task<IActionResult> GetContent()
        {
            var content = await _context.Contents.FirstOrDefaultAsync(c => c.Key == "master_portfolio_data");
            if (content != null && !string.IsNullOrWhiteSpace(content.JsonData))
            {
                var doc = JsonDocument.Parse(content.JsonData);
                return Ok(doc.RootElement);
            }
            return NotFound(new { message = "Portfolio content not found." });
        }

        // PUT: api/content
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateContent([FromBody] JsonElement newContent)
        {
            var jsonString = newContent.GetRawText();
            var content = await _context.Contents.FirstOrDefaultAsync(c => c.Key == "master_portfolio_data");

            if (content == null)
            {
                content = new PortfolioContent
                {
                    Key = "master_portfolio_data",
                    JsonData = jsonString
                };
                _context.Contents.Add(content);
            }
            else
            {
                content.JsonData = jsonString;
            }

            await _context.SaveChangesAsync();
            return Ok(new { success = true, message = "Master content updated in SQL Server!", data = newContent });
        }
    }
}
