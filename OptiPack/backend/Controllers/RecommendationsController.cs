using Microsoft.AspNetCore.Mvc;
using OptiPackBackend.DTOs;
using OptiPackBackend.Services.Interfaces;
using System.Threading.Tasks;

namespace OptiPackBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationController : ControllerBase
    {
        private readonly IRecommendationService _rec;
        public RecommendationController(IRecommendationService rec) { _rec = rec; }

        [HttpPost("recommend")]
        public async Task<IActionResult> Recommend(RecommendationRequestDto dto)
        {
            var res = await _rec.RecommendAsync(dto);
            return Ok(res);
        }
    }
}
