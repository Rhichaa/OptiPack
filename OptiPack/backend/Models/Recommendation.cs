namespace OptiPackBackend.Models
{
    public class Recommendation
    {
        public int Id { get; set; }
        public int?ProductId { get; set; }
        public int?BoxId { get; set; } // recommended box
        public string ProtectiveMaterials { get; set; } = ""; // JSON list
        public int PackagingLayers { get; set; }
        public decimal Confidence { get; set; }
        public decimal PredictedRiskPercent { get; set; }
        public string VehicleType { get; set; } = ""; // Added per your request
    }
}
