using System.ComponentModel.DataAnnotations;

namespace OptiPackBackend.Models
{
    public class PackagingInventory
    {
        [Key]
        public string MaterialId { get; set; }

        public string MaterialName { get; set; }
        public string Type { get; set; }
        public string Dimensions { get; set; }
        public string MaxWeight { get; set; }
        public int Stock { get; set; }
        public decimal Cost { get; set; }
        public string? Status { get; set; }
    }
}