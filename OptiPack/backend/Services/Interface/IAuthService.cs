using OptiPackBackend.DTOs;
using OptiPackBackend.Models;
using System.Threading.Tasks;

namespace OptiPackBackend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
        Task<AuthResponseDto?> LoginAsync(LoginDto dto);
    }
}
