namespace OptiPackBackend.DTOs
{
    public class RecommendationRequestDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; } = 1;
    }

    public class RecommendationResultDto
    {
        public string RecommendedBox { get; set; } = "";
        public string ProtectiveMaterials { get; set; } = "";
        public decimal RiskPercent { get; set; }
        public decimal Confidence { get; set; }
        public string VehicleType { get; set; } = "";
    }
}
