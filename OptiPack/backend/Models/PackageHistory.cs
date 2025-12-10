using System;

namespace OptiPackBackend.Models
{
    public class PackageHistory
    {
        public int Id { get; set; }
        public DateTime PackedAt { get; set; } = DateTime.UtcNow;
        public string ProductName { get; set; } = "";
        public int ProductId { get; set; }
        public string BoxUsed { get; set; } = "";
        public string ProtectiveMaterials { get; set; } = ""; // JSON or comma list
        public decimal Cost { get; set; }
        public string PackedBy { get; set; } = "";
        public string AiUsed { get; set; } = "Yes"; // Yes/No
        public string RiskLevel { get; set; } = "Low";
    }
}
