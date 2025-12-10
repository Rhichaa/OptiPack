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

        [HttpPost("{id}/edit")]
        public async Task<IActionResult> Edit(int id, [FromBody] dynamic model)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return NotFound();
            user.FullName = model.fullName ?? user.FullName;
            user.Phone = model.phone ?? user.Phone;
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}


