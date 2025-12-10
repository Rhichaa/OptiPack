using Microsoft.EntityFrameworkCore;
using OptiPackBackend.Data;
using OptiPackBackend.Models;
using OptiPackBackend.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OptiPackBackend.Services.Implementations
{
    public class InventoryService : IInventoryService
    {
        private readonly ApplicationDbContext _db;
        public InventoryService(ApplicationDbContext db) { _db = db; }

        public async Task<List<Box>> GetBoxesAsync()
        {
            return await _db.Boxes.ToListAsync();
        }
        public async Task<List<ProtectiveMaterial>> GetMaterialsAsync()
        {
            return await _db.ProtectiveMaterials.ToListAsync();
        }

        public async Task UpdateBoxStockAsync(int boxId, int delta)
        {
            var box = await _db.Boxes.FindAsync(boxId);
            if (box == null) return;
            box.Stock += delta;
            await _db.SaveChangesAsync();
        }

        public async Task UpdateMaterialStockAsync(int materialId, int delta)
        {
            var mat = await _db.ProtectiveMaterials.FindAsync(materialId);
            if (mat == null) return;
            mat.StockUnits += delta;
            await _db.SaveChangesAsync();
        }
    }
}
