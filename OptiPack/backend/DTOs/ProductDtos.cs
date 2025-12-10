namespace OptiPackBackend.DTOs
{
    public class ImageUploadResultDto
    {
        public int? ProductId { get; set; }
        public string ProductName { get; set; } = "";
        public decimal LengthCm { get; set; }
        public decimal WidthCm { get; set; }
        public decimal HeightCm { get; set; }
        public decimal WeightKg { get; set; }
        public string FragilityLevel { get; set; } = "";
        public string Category { get; set; } = "";
        public string ImageUrl { get; set; } = "";
    }
}
