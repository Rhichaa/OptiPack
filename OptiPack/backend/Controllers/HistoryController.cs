using Microsoft.AspNetCore.Mvc;
using OptiPackBackend.Services.Interfaces;
using System.Threading.Tasks;
using OptiPackBackend.Models;

namespace OptiPackBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HistoryController : ControllerBase
    {
        private readonly IHistoryService _hist;
        public HistoryController(IHistoryService hist) { _hist = hist; }

        [HttpGet("recent")]
        public async Task<IActionResult> Recent() => Ok(await _hist.GetRecentHistoryAsync(50));

        [HttpPost("log")]
        public async Task<IActionResult> Log([FromBody] PackageHistory history)
        {
            await _hist.LogPackagingAsync(history);
            return Ok();
        }
    }
}
