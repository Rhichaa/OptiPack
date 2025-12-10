namespace OptiPackBackend.Models
{
    public class Box
    {
        public int Id { get; set; }
        public string BoxId { get; set; } = "";
        public decimal LengthCm { get; set; }
        public decimal WidthCm { get; set; }
        public decimal HeightCm { get; set; }
        public decimal MaxWeightKg { get; set; }
        public decimal CostPerBox { get; set; } // use HasPrecision in DbContext
        public int Stock { get; set; }
    }
}

