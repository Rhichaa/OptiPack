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

        public async Task<RecommendationResultDto> RecommendAsync(RecommendationRequestDto request)
        {
            // Get product
            var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == request.ProductId);
            if (product == null) throw new System.Exception("Product not found");

            // Simple logic (STUB) — choose first box that fits
            var volume = product.LengthCm * product.WidthCm * product.HeightCm;
            var candidateBox = await _db.Boxes
                .Where(b => b.LengthCm >= product.LengthCm && b.WidthCm >= product.WidthCm && b.HeightCm >= product.HeightCm && b.MaxWeightKg >= product.WeightKg)
                .OrderBy(b => b.CostPerBox)
                .FirstOrDefaultAsync();

            // If AI model is used, replace above with ML model call:
            // var mlResult = _aiModel.Predict(...);

            string boxDesc = candidateBox != null ? candidateBox.BoxId : "CUSTOM_BOX";
            // Protective materials (simple rule)
            string prot = product.FragilityLevel switch
            {
                "High" => "BubbleWrap:3, Foam:1",
                "Low" => "BubbleWrap:1",
                _ => "BubbleWrap:2"
            };

            // Vehicle suggestion based on size & weight (your extra)
            string vehicle = (product.WeightKg > 20 || product.HeightCm > 100) ? "Truck" :
                             (product.WeightKg > 5) ? "Van" : "Two-wheeler";

            var result = new RecommendationResultDto
            {
                RecommendedBox = boxDesc,
                ProtectiveMaterials = prot,
                Confidence = 0.85m, // placeholder
                RiskPercent = product.FragilityLevel == "High" ? 5m : 1.5m,
                VehicleType = vehicle
            };

            // optionally save recommendation history
            var rec = new Recommendation
            {
                ProductId = product.Id,
                BoxId = candidateBox?.Id ?? 0,
                ProtectiveMaterials = prot,
                Confidence = result.Confidence,
                PredictedRiskPercent = result.RiskPercent,
                VehicleType = vehicle
            };
            _db.Recommendations.Add(rec);
            await _db.SaveChangesAsync();

            return result;
        }
    }
}
