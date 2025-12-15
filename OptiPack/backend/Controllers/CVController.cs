using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OptiPackBackend.Data;
using OptiPackBackend.Models;
using OptiPackBackend.Services.Interfaces;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace OptiPackBackend.Controllers
{
    [ApiController]
    [Route("api/cv")]
    public class CVController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly ApplicationDbContext _db;
        private readonly IRecommendationService _recommendationService;

        public CVController(
            IHttpClientFactory httpClientFactory,
            ApplicationDbContext db,
            IRecommendationService recommendationService)
        {
            _httpClient = httpClientFactory.CreateClient();
            _db = db;
            _recommendationService = recommendationService;
        }

        [HttpPost("analyze")]
        public async Task<IActionResult> Analyze([FromForm] IFormFile image)
        {
            // 1️⃣ Call Python CV service
            var cvResponse = await CallPythonCV(image);

            var cvJson = JsonDocument.Parse(cvResponse);
            var productJson = cvJson.RootElement.GetProperty("product");

            string productName = productJson.GetProperty("name").GetString()!;
            string category = productJson.GetProperty("category").GetString()!;

            // 2️⃣ Fetch REAL product details from DB
            var product = await _db.Products.FirstOrDefaultAsync(p =>
                p.ProductName == productName &&
                p.Category == category
            );

            if (product == null)
                return NotFound("Product not found in ProductMaster database");

            // 3️⃣ Call C# AI Recommendation Engine
            var recommendation =
                await _recommendationService.RecommendAsync(product);

            // 4️⃣ Return combined result
            return Ok(new
            {
                detectedProduct = new
                {
                    productName,
                    category
                },
                productDetails = product,
                recommendation
            });
        }

        // ---------------- HELPER METHOD ----------------

        private async Task<string> CallPythonCV(IFormFile image)
        {
            var url = "http://127.0.0.1:5001/analyze";

            using var content = new MultipartFormDataContent();
            content.Add(
                new StreamContent(image.OpenReadStream()),
                "image",
                image.FileName
            );

            var response = await _httpClient.PostAsync(url, content);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }
    }
}