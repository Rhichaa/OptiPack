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
    }
}
