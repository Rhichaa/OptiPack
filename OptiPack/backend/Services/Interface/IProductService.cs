using OptiPackBackend.DTOs;
using OptiPackBackend.Models;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace OptiPackBackend.Services.Interfaces
{
    public interface IProductService
    {
        Task<ImageUploadResultDto> ProcessImageAndCreateProductAsync(IFormFile imageFile);
        Task<Product?> GetProductByIdAsync(int id);
    }
}
