namespace PortfolioApi.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using PortfolioApi.Data;
    using PortfolioApi.DTOs;
    using PortfolioApi.Models;

    
    [ApiController]
    [Route("api/messages")]
    public class MessagesController : ControllerBase
    {
       
        private readonly PortfolioDbContext _context;

       
        public MessagesController(PortfolioDbContext context)
        {
            _context = context;
        }

        // GET: api/messages

      
        [HttpGet]
        public async Task<IActionResult> GetMessages()
        {
            var messages = await _context.Messages
                .OrderByDescending(m => m.CreatedAt)
                .Select(m => new
                {
                    _id = m.Id.ToString(),
                    id = m.Id,
                    name = m.Name,
                    email = m.Email,
                    subject = m.Subject,
                    message = m.Message,
                    createdAt = m.CreatedAt.ToString("o")
                })
                .ToListAsync();

            return Ok(messages);
        }

        // POST: api/messages

        
        [HttpPost]
        public async Task<IActionResult> CreateMessage([FromBody] MessageDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name) ||
                string.IsNullOrWhiteSpace(dto.Email) ||
                string.IsNullOrWhiteSpace(dto.Message))
            {
                return BadRequest(new { error = "Name, email and message are required." });
            }

            var contactMessage = new ContactMessage
            {
                Name = dto.Name.Trim(),
                Email = dto.Email.Trim(),
                Subject = dto.Subject?.Trim() ?? string.Empty,
                Message = dto.Message.Trim(),
                CreatedAt = DateTime.UtcNow
            };

            _context.Messages.Add(contactMessage);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMessages), new { id = contactMessage.Id }, new
            {
                _id = contactMessage.Id.ToString(),
                id = contactMessage.Id,
                name = contactMessage.Name,
                email = contactMessage.Email,
                subject = contactMessage.Subject,
                message = contactMessage.Message,
                createdAt = contactMessage.CreatedAt.ToString("o")
            });
        }

        // DELETE: api/messages/{id}

      
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var msg = await _context.Messages.FindAsync(id);
            if (msg == null)
            {
                // Try parsing if passed string ID
                return NotFound(new { success = false, message = "Message not found." });
            }

            _context.Messages.Remove(msg);
            await _context.SaveChangesAsync();
            return Ok(new { success = true });
        }
    }
}
