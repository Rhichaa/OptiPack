using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OptiPackBackend.Data;
using OptiPackBackend.DTOs;
using OptiPackBackend.Models;
using OptiPackBackend.Services.Interfaces;
using System.Threading.Tasks;

namespace OptiPackBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationController : ControllerBase
    {
        private readonly IRecommendationService _recService;
        private readonly ApplicationDbContext _db;

        public RecommendationController(
            IRecommendationService recService,
            ApplicationDbContext db)
        {
            _recService = recService;
            _db = db;
        }

        // 🔹 USED WHEN PRODUCT IS ALREADY IN DB (CV FLOW)
        [HttpPost("by-product-id/{productId}")]
        public async Task<IActionResult> RecommendByProductId(int productId)
        {
            var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == productId);

            if (product == null)
                return NotFound("Product not found");

            var result = await _recService.RecommendAsync(product);
            return Ok(result);
        }

        // 🔹 USED FOR MANUAL ENTRY (FULL PRODUCT SENT)
        [HttpPost("manual")]
        public async Task<IActionResult> RecommendManual([FromBody] Product product)
        {
            var result = await _recService.RecommendAsync(product);
            return Ok(result);
        }
    }
}