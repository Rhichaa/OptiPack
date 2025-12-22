using Microsoft.AspNetCore.Mvc;
using OptiPackBackend.DTOs;
using OptiPackBackend.Services.Interfaces;
using System.Threading.Tasks;

namespace OptiPackBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _auth;
        public AuthController(IAuthService auth) { _auth = auth; }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var res = await _auth.RegisterAsync(dto);
            return Ok(res);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var res = await _auth.LoginAsync(dto);
            if (res == null) return Unauthorized();
            return Ok(res);
        }

        [HttpPost("save-settings")]
        public async Task<IActionResult> SaveSettings(SettingsDto dto)
        {
            var result = await _auth.UpdateSettingsAsync(dto);
            if (!result) return NotFound(new { message = "User not found" });
            return Ok(new { message = "Settings saved to cloud" });
        }

        // ADDED THIS MISSING METHOD
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
        {
            var result = await _auth.ChangePasswordAsync(dto);
            if (!result) return BadRequest(new { message = "Invalid current password or user not found" });
            return Ok(new { message = "Password updated successfully" });
        }
    }
}





/*using Microsoft.AspNetCore.Mvc;
using OptiPackBackend.DTOs;
using OptiPackBackend.Services.Interfaces;
using System.Threading.Tasks;

namespace OptiPackBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _auth;
        public AuthController(IAuthService auth) { _auth = auth; }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var res = await _auth.RegisterAsync(dto);
            return Ok(res);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var res = await _auth.LoginAsync(dto);
            if (res == null) return Unauthorized();
            return Ok(res);
        }
        [HttpPost("save-settings")]
        public async Task<IActionResult> SaveSettings(SettingsDto dto)
       {
            var result = await _auth.UpdateSettingsAsync(dto);
            if (!result) return NotFound(new { message = "User not found" });
            return Ok(new { message = "Settings saved to cloud" });
       }
    }
}
*/