using Microsoft.AspNetCore.Mvc;
using OptiPackBackend.DTOs;
using OptiPackBackend.Models;
using OptiPackBackend.Services.Interfaces;
using System.Threading.Tasks;

namespace OptiPackBackend.Controllers
{
    [ApiController]
    [Route("api/manual")]
    public class ManualEntryController : ControllerBase
    {
        private readonly IRecommendationService _recommendationService;

        public ManualEntryController(IRecommendationService recommendationService)
        {
            _recommendationService = recommendationService;
        }

        [HttpPost("apply-recommendation")]
        public async Task<IActionResult> ApplyRecommendation(
            [FromBody] ManualProductDto dto)
        {
            // Convert manual input to Product model
            var product = new Product
            {
                ProductName = dto.ProductName,
                Category = dto.Category,
                WeightKg = dto.WeightKg,
                LengthCm = dto.LengthCm,
                WidthCm = dto.WidthCm,
                HeightCm = dto.HeightCm,
                FragilityLevel = dto.Fragility
            };

            // Call AI / Recommendation engine
            var result = await _recommendationService.RecommendAsync(product);

            return Ok(result);
        }
    }
}