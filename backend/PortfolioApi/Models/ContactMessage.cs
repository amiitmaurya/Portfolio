namespace PortfolioApi.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;


    public class ContactMessage
    {
       
        [Key]
        public int Id { get; set; }

       
        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

       
        [Required]
        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        
        [MaxLength(200)]
        public string Subject { get; set; } = string.Empty;

        
        [Required]
        public string Message { get; set; } = string.Empty;

        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
