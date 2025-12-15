using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OptiPackBackend.DTOs;
using OptiPackBackend.Models;
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

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage([FromForm] ProductUploadRequest request)
        {

            var file = request.ImageFile;

            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");


            return Ok("File uploaded");
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
