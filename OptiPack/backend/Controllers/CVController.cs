using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OptiPackBackend.Data;
using OptiPackBackend.Models;
using OptiPackBackend.Services.Interfaces;
using System.Net.Http;
using System.Text.Json;

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
        public async Task<IActionResult> AnalyzeImage([FromForm(Name = "image")] IFormFile image)
        {
            try
            {
                // 0️⃣ Validate image
                if (image == null || image.Length == 0)
                    return BadRequest("Image not received");

                // 1️⃣ Call Python CV service
                var cvJsonString = await CallPythonCV(image);

                // 2️⃣ Parse Python response (MATCHES REAL RESPONSE)
                var root = JsonDocument.Parse(cvJsonString).RootElement;

                if (!root.TryGetProperty("product", out var productJson))
                    return StatusCode(500, "Invalid CV response format");

                string label = productJson.GetProperty("name").GetString()!;
                string category = productJson.GetProperty("category").GetString()!;

                var dimensions = productJson.GetProperty("dimensions");
                int length = dimensions[0].GetInt32();
                int width = dimensions[1].GetInt32();
                int height = dimensions[2].GetInt32();

                // 3️⃣ Find matching product in DB
                var product = await _db.Products.FirstOrDefaultAsync(p =>
                    p.ProductName.ToLower() == label.ToLower() &&
                    p.Category.ToLower() == category.ToLower()
                );

                if (product == null)
                    return NotFound("Product not found in Product Master");

                // 4️⃣ Call AI Recommendation Service
                var recommendation = await _recommendationService.RecommendAsync(product);

                // 5️⃣ Return final response to frontend
                return Ok(new
                {
                    detected = new
                    {
                        label,
                        category,
                        length,
                        width,
                        height
                    },
                    dbMatchedProduct = product,
                    recommendation
                });
            }
            catch (Exception ex)
            {
                // 🔥 CRITICAL: expose real error
                Console.WriteLine("CV ANALYZE ERROR: " + ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
        private async Task<string> CallPythonCV(IFormFile image)
{
    var url = "http://127.0.0.1:5001/analyze";

    using var content = new MultipartFormDataContent();

    var streamContent = new StreamContent(image.OpenReadStream());
    streamContent.Headers.ContentType =
        new System.Net.Http.Headers.MediaTypeHeaderValue(image.ContentType);

    // ⚠️ Must match FastAPI parameter name
    content.Add(streamContent, "file", image.FileName);

    var response = await _httpClient.PostAsync(url, content);
    var responseBody = await response.Content.ReadAsStringAsync();

    if (!response.IsSuccessStatusCode)
    {
        throw new Exception($"Python CV Error: {responseBody}");
    }

    return responseBody;
}

        // ---------------- HELPER METHOD ----------------
       /* private async Task<string> CallPythonCV(IFormFile image)
        {
            var url = "http://127.0.0.1:5001/analyze";

            using var content = new MultipartFormDataContent();
            using var stream = new StreamContent(image.OpenReadStream());

            content.Add(stream, "file", image.FileName);

            var response = await _httpClient.PostAsync(url, content);

            // If Python fails, this will throw and be caught above
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }*/
    }
}










/*using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OptiPackBackend.Data;
using OptiPackBackend.Models;
using OptiPackBackend.Services.Interfaces;
using System.Net.Http;
using System.Text.Json;

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
        public async Task<IActionResult> AnalyzeImage([FromForm(Name ="image")] IFormFile image)
        {
            if (image == null || image.Length == 0)
                return BadRequest("Image not received");

            // 1️⃣ Call Python CV (FastAPI)
            var cvJsonString = await CallPythonCV(image);
            var cvJson = JsonDocument.Parse(cvJsonString).RootElement;

            string label = cvJson.GetProperty("label").GetString()!;
            string category = cvJson.GetProperty("category").GetString()!;
            int length = cvJson.GetProperty("length").GetInt32();
            int width = cvJson.GetProperty("width").GetInt32();
            int height = cvJson.GetProperty("height").GetInt32();

            // 2️⃣ Match product from DB (Product Master)
            var product = await _db.Products.FirstOrDefaultAsync(p =>
                p.ProductName.ToLower() == label.ToLower() &&
                p.Category.ToLower() == category.ToLower()
            );

            if (product == null)
                return NotFound("Product not found in Product Master");

            // 3️⃣ AI Recommendation (C# Service)
            var recommendation = await _recommendationService.RecommendAsync(product);

            // 4️⃣ Return FINAL response
            return Ok(new
            {
                productDetails = product,
                recommendation
            });
        }

        // ---------------- HELPER ----------------
        private async Task<string> CallPythonCV(IFormFile image)
        {
            var url = "http://127.0.0.1:5001/analyze";

            using var content = new MultipartFormDataContent();
            content.Add(new StreamContent(image.OpenReadStream()), "image", image.FileName);

            var response = await _httpClient.PostAsync(url, content);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }
    }
}*/