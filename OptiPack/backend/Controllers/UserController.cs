using Microsoft.AspNetCore.Mvc;
using OptiPackBackend.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace OptiPackBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public UserController(ApplicationDbContext db) { _db = db; }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) return NotFound();
            return Ok(new { user.Id, user.FullName, user.Email, user.Phone, user.CreatedAt, user.LastLogin });
        }

        // Updated to handle 405 and 400 errors
        [HttpPost("{id}/edit")]
        public async Task<IActionResult> Edit(int id, [FromBody] UserUpdateModel model)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return NotFound(new { message = "User not found" });

            // Update only provided fields
            if (!string.IsNullOrEmpty(model.FullName)) user.FullName = model.FullName;
            if (!string.IsNullOrEmpty(model.Phone)) user.Phone = model.Phone;

            await _db.SaveChangesAsync();

            // Return updated data to prevent frontend syntax errors
            return Ok(new { 
                user.Id, 
                user.FullName, 
                user.Phone, 
                message = "Update successful" 
            });
        }
    }

    // Model to match incoming JSON keys exactly
    public class UserUpdateModel
    {
        public string? FullName { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
    }
}