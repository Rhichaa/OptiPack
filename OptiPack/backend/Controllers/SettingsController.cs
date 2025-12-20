using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OptiPackBackend.Data;
using OptiPackBackend.DTOs;
using OptiPackBackend.Models;

[ApiController]
[Route("api/settings")]
public class SettingsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SettingsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == dto.UserId);

        if (user == null)
            return NotFound("User not found");

        // ✅ STEP 1: Verify current password using BCrypt
        if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.Password))
            return BadRequest("Current password is incorrect");

        if (dto.NewPassword != dto.ConfirmPassword)
            return BadRequest("Passwords do not match");

        // ✅ STEP 2: Hash new password
        user.Password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);

        await _context.SaveChangesAsync();

        return Ok("Password changed successfully");
    }
}