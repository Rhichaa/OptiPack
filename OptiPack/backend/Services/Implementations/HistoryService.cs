using Microsoft.EntityFrameworkCore;
using OptiPackBackend.Data;
using OptiPackBackend.Models;
using OptiPackBackend.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OptiPackBackend.Services.Implementations
{
    public class HistoryService : IHistoryService
    {
        private readonly ApplicationDbContext _db;
        public HistoryService(ApplicationDbContext db) { _db = db; }

        public async Task LogPackagingAsync(PackageHistory history)
        {
            _db.PackageHistories.Add(history);
            await _db.SaveChangesAsync();
        }

        public async Task<List<PackageHistory>> GetRecentHistoryAsync(int count = 50)
        {
            return await _db.PackageHistories.OrderByDescending(h => h.PackedAt).Take(count).ToListAsync();
        }
    }
}
