using Microsoft.EntityFrameworkCore;
using OptiPackBackend.Data;
using OptiPackBackend.DTOs;
using OptiPackBackend.Models;
using OptiPackBackend.Services.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace OptiPackBackend.Services.Implementations
{
    public class RecommendationService : IRecommendationService
    {
        private readonly ApplicationDbContext _db;

        public RecommendationService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<RecommendationResultDto> RecommendAsync(Product product)
        {
           

            // 2. Find suitable box (rule-based AI logic)
            var candidateBox = await _db.Boxes
                .Where(b =>
                    b.LengthCm >= product.LengthCm &&
                    b.WidthCm >= product.WidthCm &&
                    b.HeightCm >= product.HeightCm &&
                    b.MaxWeightKg >= product.WeightKg)
                .OrderBy(b => b.CostPerBox)
                .FirstOrDefaultAsync();

            string recommendedBox = candidateBox != null
                ? candidateBox.BoxId
                : "CUSTOM_BOX";

            // 3. Protective materials + layers (based on fragility)
            string protectiveMaterial;
            int packagingLayers;
            decimal damageRiskScore;
            int aiConfidenceScore;

            switch (product.FragilityLevel)
            {
                case "High":
                    protectiveMaterial = "Bubble Wrap + Foam";
                    packagingLayers = 3;
                    damageRiskScore = 5.0m;   // %
                    aiConfidenceScore = 92;
                    break;

                case "Medium":
                    protectiveMaterial = "Bubble Wrap";
                    packagingLayers = 2;
                    damageRiskScore = 10.0m;  // %
                    aiConfidenceScore = 85;
                    break;

                default:
                    protectiveMaterial = "Paper Cushioning";
                    packagingLayers = 1;
                    damageRiskScore = 3.0m;   // %
                    aiConfidenceScore = 90;
                    break;
            }

            // 4. Vehicle recommendation (based on size & weight)
            string vehicle = (product.WeightKg > 20 || product.HeightCm > 100)
                ? "Truck"
                : (product.WeightKg > 5)
                    ? "Van"
                    : "Two-Wheeler";

            // 5. Prepare response DTO (what frontend needs)
            var result = new RecommendationResultDto
            {
                RecommendedBox = recommendedBox,
                ProtectiveMaterials = protectiveMaterial,
                PackagingLayers = packagingLayers,
                DamageRiskScore = damageRiskScore,
                AiConfidenceScore = aiConfidenceScore,
                VehicleType = vehicle
            };

            // 6. Save recommendation history (optional but GOOD)
            var rec = new Recommendation
            {
                ProductId = product.Id>0?product.Id:null,
                BoxId = candidateBox?.Id ?? 0,
                ProtectiveMaterials = protectiveMaterial,
                PackagingLayers = packagingLayers,
                PredictedRiskPercent = damageRiskScore,
                Confidence = aiConfidenceScore / 100m,
                VehicleType = vehicle
            };

            _db.Recommendations.Add(rec);
            await _db.SaveChangesAsync();

            return result;
        }
    }
}
