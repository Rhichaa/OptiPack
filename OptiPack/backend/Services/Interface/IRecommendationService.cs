using OptiPackBackend.DTOs;
using System.Threading.Tasks;

namespace OptiPackBackend.Services.Interfaces
{
    public interface IRecommendationService
    {
        Task<RecommendationResultDto> RecommendAsync(RecommendationRequestDto request);
    }
}
