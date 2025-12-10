using System;

namespace OptiPackBackend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; } = "";
        public string Category { get; set; } = "";
        public decimal LengthCm { get; set; }
        public decimal WidthCm { get; set; }
        public decimal HeightCm { get; set; }
        public decimal WeightKg { get; set; }
        public string FragilityLevel { get; set; } = "Medium"; // Low/Medium/High
        public string ImageUrl { get; set; } = "";
        // If you want SKU later, add SKU property
    }
}
