namespace PortfolioApi.Models
{
    using System.ComponentModel.DataAnnotations;

    public class PortfolioContent
    {
        
        [Key]
        public int Id { get; set; }

        
        [Required]
        [MaxLength(100)]
        public string Key { get; set; } = string.Empty;

      
        [Required]
        public string JsonData { get; set; } = string.Empty;
    }
}
