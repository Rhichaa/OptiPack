using OptiPackBackend.DTOs;
using OptiPackBackend.Models;
using System.Threading.Tasks;

namespace OptiPackBackend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
        Task<AuthResponseDto?> LoginAsync(LoginDto dto);
        Task<bool> UpdateSettingsAsync(SettingsDto dto);
        // Added this line to match your Implementation
        Task<bool> ChangePasswordAsync(ChangePasswordDto dto);
    }
}