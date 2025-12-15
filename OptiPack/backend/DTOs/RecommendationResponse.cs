public class RecommendationResultDto
{
    public string RecommendedBox { get; set; }
    public string ProtectiveMaterials { get; set; }
    public int PackagingLayers { get; set; }
    public decimal DamageRiskScore { get; set; }
    public int AiConfidenceScore { get; set; }
    public string VehicleType { get; set; }
}