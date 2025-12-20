using Microsoft.AspNetCore.Mvc;
using OptiPackBackend.Data;
using OptiPackBackend.DTOs;
using OptiPackBackend.Models;

namespace OptiPackBackend.Controllers
{
    [ApiController]
    [Route("api/manual-products")]
    public class ManualProductController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public ManualProductController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveProduct([FromBody] ManualProductCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            ProductMaster product = new ProductMaster
            {
                ProductName = dto.ProductName,
                Category = dto.Category,
                Weight = (double)dto.WeightKg,
                Length = (double)dto.LengthCm,
                Width = (double)dto.WidthCm,
                Height = (double)dto.HeightCm,
                Fragility = dto.FragilityLevel
            };

            _db.ProductMaster.Add(product);
            await _db.SaveChangesAsync();

            return Ok(product);
        }
    }
}