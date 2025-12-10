using Microsoft.AspNetCore.Mvc;
using OptiPackBackend.Services.Interfaces;
using System.Threading.Tasks;

namespace OptiPackBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inv;
        public InventoryController(IInventoryService inv) { _inv = inv; }

        [HttpGet("boxes")]
        public async Task<IActionResult> GetBoxes() => Ok(await _inv.GetBoxesAsync());

        [HttpGet("materials")]
        public async Task<IActionResult> GetMaterials() => Ok(await _inv.GetMaterialsAsync());

        [HttpPost("boxes/{id}/update-stock")]
        public async Task<IActionResult> UpdateBoxStock(int id, [FromQuery]int delta)
        {
            await _inv.UpdateBoxStockAsync(id, delta);
            return Ok();
        }

        [HttpPost("materials/{id}/update-stock")]
        public async Task<IActionResult> UpdateMaterialStock(int id, [FromQuery]int delta)
        {
            await _inv.UpdateMaterialStockAsync(id, delta);
            return Ok();
        }
    }
}
