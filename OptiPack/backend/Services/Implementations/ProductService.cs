using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using OptiPackBackend.Data;
using OptiPackBackend.DTOs;
using OptiPackBackend.Models;
using OptiPackBackend.Services.Interfaces;
using System;
using System.IO;
using System.Threading.Tasks;

namespace OptiPackBackend.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _env;

        public ProductService(ApplicationDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }

        public async Task<ImageUploadResultDto> ProcessImageAndCreateProductAsync(IFormFile imageFile)
        {
            // 1) Save image to local folder (or blob storage)
            var uploads = Path.Combine(_env.ContentRootPath, "Uploads");
            if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";
            var filePath = Path.Combine(uploads, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            // 2) Run computer vision model (STUB)
            // Here you should call your CV model (either ML.NET or Python service).
            // For now we simulate detection:
            var detected = new ImageUploadResultDto
            {
                ProductName = "Detected Water Bottle",
                Category = "Bottle",
                LengthCm = 25m,
                WidthCm = 7m,
                HeightCm = 25m,
                WeightKg = 0.45m,
                FragilityLevel = "Low",
                ImageUrl = $"/uploads/{fileName}"
            };

            // 3) Save product to DB (if not exist)
            var product = new Product
            {
                ProductName = detected.ProductName,
                Category = detected.Category,
                LengthCm = detected.LengthCm,
                WidthCm = detected.WidthCm,
                HeightCm = detected.HeightCm,
                WeightKg = detected.WeightKg,
                FragilityLevel = detected.FragilityLevel,
                ImageUrl = detected.ImageUrl
            };

            _db.Products.Add(product);
            await _db.SaveChangesAsync();

            detected.ProductId = product.Id;
            return detected;
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await _db.Products.FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}
