using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OptiPackBackend.DTOs;
using OptiPackBackend.Services.Interfaces;
using System.Threading.Tasks;

namespace OptiPackBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _product;
        public ProductController(IProductService product) { _product = product; }

        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile image)
        {
            var result = await _product.ProcessImageAndCreateProductAsync(image);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var p = await _product.GetProductByIdAsync(id);
            if (p == null) return NotFound();
            return Ok(p);
        }
    }
}
