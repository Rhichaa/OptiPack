using OptiPackBackend.DTOs;
using OptiPackBackend.Models;
using System.Threading.Tasks;

namespace OptiPackBackend.Services.Interfaces
{
    public interface IRecommendationService
    {
        Task<RecommendationResultDto> RecommendAsync(Product product);
    }
}
