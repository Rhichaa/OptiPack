namespace OptiPackBackend.DTOs
{
    public class ManualProductDto
    {
        public string ProductName { get; set; }
        public string Category { get; set; }

        public decimal WeightKg { get; set; }
        public decimal LengthCm { get; set; }
        public decimal WidthCm { get; set; }
        public decimal HeightCm { get; set; }

        public string Fragility { get; set; }
    }
}