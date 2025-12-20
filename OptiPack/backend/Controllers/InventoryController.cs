using Microsoft.AspNetCore.Mvc;
using OptiPackBackend.Data;
using OptiPackBackend.Models;
using System.Linq;

namespace OptiPackBackend.Controllers
{
    [ApiController]
    [Route("api/inventory")]
    public class InventoryController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public InventoryController(ApplicationDbContext db)
        {
            _db = db;
        }

        // 1. GET: api/inventory
        // Fetches all materials from the database to replace dummy data in React
        [HttpGet]
        public IActionResult GetAll()
        {
            var list = _db.PackagingInventory.ToList();
            return Ok(list);
        }

        // 2. POST: api/inventory
        // Handles "Add New Material" from the React modal
        [HttpPost]
        public IActionResult AddMaterial([FromBody] PackagingInventory material)
        {
            if (material == null)
                return BadRequest("Invalid material data");

            // Prevent duplicate MaterialId
            if (_db.PackagingInventory.Any(m => m.MaterialId == material.MaterialId))
                return BadRequest("Material ID already exists");

            // Auto status logic
            UpdateStatus(material);

            _db.PackagingInventory.Add(material);
            _db.SaveChanges();

            return Ok(new
            {
                message = "Material saved successfully",
                material
            });
        }

        // 3. PUT: api/inventory/{id}
        // Handles editing existing materials when the pencil icon is clicked
        [HttpPut("{id}")]
        public IActionResult UpdateMaterial(string id, [FromBody] PackagingInventory updatedData)
        {
            var existingMaterial = _db.PackagingInventory.Find(id);
            if (existingMaterial == null)
                return NotFound("Material not found");

            // Update fields
            existingMaterial.MaterialName = updatedData.MaterialName;
            existingMaterial.Type = updatedData.Type;
            existingMaterial.Dimensions = updatedData.Dimensions;
            existingMaterial.MaxWeight = updatedData.MaxWeight;
            existingMaterial.Stock = updatedData.Stock;
            existingMaterial.Cost = updatedData.Cost;

            // Recalculate status
            UpdateStatus(existingMaterial);

            _db.SaveChanges();
            return Ok(new { message = "Material updated successfully", material = existingMaterial });
        }

        // 4. DELETE: api/inventory/{id}
        // Handles removing materials when the trash icon is clicked
        [HttpDelete("{id}")]
        public IActionResult DeleteMaterial(string id)
        {
            var material = _db.PackagingInventory.Find(id);
            if (material == null)
                return NotFound("Material not found");

            _db.PackagingInventory.Remove(material);
            _db.SaveChanges();

            return Ok(new { message = "Material deleted successfully" });
        }

        // Helper method to keep status logic consistent across Add and Update
        private void UpdateStatus(PackagingInventory material)
        {
            if (material.Stock == 0)
                material.Status = "Out of Stock";
            else if (material.Stock <= 50)
                material.Status = "Low Stock";
            else
                material.Status = "In Stock";
        }
    }
}






/*using Microsoft.AspNetCore.Mvc;
using OptiPackBackend.Data;
using OptiPackBackend.Models;
using System.Linq;

namespace OptiPackBackend.Controllers
{
    [ApiController]
    [Route("api/inventory")]
    public class InventoryController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public InventoryController(ApplicationDbContext db)
        {
            _db = db;
        }

        // POST: api/inventory
        [HttpPost]
        public IActionResult AddMaterial([FromBody] PackagingInventory material)
        {
            if (material == null)
                return BadRequest("Invalid material data");

            // Prevent duplicate MaterialId
            if (_db.PackagingInventory.Any(m => m.MaterialId == material.MaterialId))
                return BadRequest("Material ID already exists");

            // Auto status logic
            if (material.Stock == 0)
                material.Status = "Out of Stock";
            else if (material.Stock <= 50)
                material.Status = "Low Stock";
            else
                material.Status = "In Stock";

            _db.PackagingInventory.Add(material);
            _db.SaveChanges();

            return Ok(new
            {
                message = "Material saved successfully",
                material
            });
        }
    }
}*/