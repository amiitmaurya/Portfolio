namespace PortfolioApi.Models
{
    using System.ComponentModel.DataAnnotations;

    
    public class AdminUser
    {
        
        [Key]
        public int Id { get; set; }

        
        [Required]
        [MaxLength(100)]
        public string Username { get; set; } = string.Empty;

       
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
