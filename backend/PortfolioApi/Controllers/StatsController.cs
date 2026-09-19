namespace PortfolioApi.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using PortfolioApi.Data;
    using PortfolioApi.Models;

   
    [ApiController]
    [Route("api/stats")]
    public class StatsController : ControllerBase
    {
       
        private readonly PortfolioDbContext _context;

        
        public StatsController(PortfolioDbContext context)
        {
            _context = context;
        }

        // GET: api/stats

        
        [HttpGet]
        public async Task<IActionResult> GetStats()
        {
            var viewsStat = await _context.Stats.FirstOrDefaultAsync(s => s.Key == "profile_views");
            var downloadsStat = await _context.Stats.FirstOrDefaultAsync(s => s.Key == "resume_downloads");

            return Ok(new
            {
                views = viewsStat?.Value ?? 0,
                downloads = downloadsStat?.Value ?? 0,
                database = "SQL Server (SSMS)"
            });
        }

        // POST: api/stats/visit

       
        [HttpPost("visit")]
        public async Task<IActionResult> RecordVisit()
        {
            var stat = await _context.Stats.FirstOrDefaultAsync(s => s.Key == "profile_views");
            if (stat == null)
            {
                stat = new PortfolioStat { Key = "profile_views", Value = 1 };
                _context.Stats.Add(stat);
            }
            else
            {
                stat.Value += 1;
            }

            await _context.SaveChangesAsync();
            return Ok(new { views = stat.Value, database = "SQL Server (SSMS)" });
        }

        // POST: api/stats/download

        
        [HttpPost("download")]
        public async Task<IActionResult> RecordDownload()
        {
            var stat = await _context.Stats.FirstOrDefaultAsync(s => s.Key == "resume_downloads");
            if (stat == null)
            {
                stat = new PortfolioStat { Key = "resume_downloads", Value = 1 };
                _context.Stats.Add(stat);
            }
            else
            {
                stat.Value += 1;
            }

            await _context.SaveChangesAsync();
            return Ok(new { downloads = stat.Value, database = "SQL Server (SSMS)" });
        }
    }
}
