namespace PortfolioApi.Models
{
    using System.ComponentModel.DataAnnotations;

  
    public class PortfolioStat
    {
        [Key]
        public int Id { get; set; }

     
        [Required]
        [MaxLength(100)]
        public string Key { get; set; } = string.Empty;

        
        public int Value { get; set; }
    }
}
