using Microsoft.AspNetCore.Http;

namespace OptiPackBackend.DTOs
{
    public class CVAnalyzeRequest
    {
        public IFormFile Image { get; set; } = null!;
    }
}
