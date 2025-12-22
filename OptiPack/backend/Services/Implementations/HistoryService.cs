using Microsoft.EntityFrameworkCore;
using OptiPackBackend.Data;
using OptiPackBackend.Models;
using OptiPackBackend.Services.Interfaces;
using System;
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
            // ROOT CAUSE FIX: Find the product by name to get its real ID
            var product = await _db.Products
                .FirstOrDefaultAsync(p => p.ProductName.ToLower() == history.ProductName.ToLower());

            // If the product (e.g., "mouse") doesn't exist, create it in the Product table first
            if (product == null)
            {
                product = new Product
                {
                    ProductName = history.ProductName,
                    Category = "General",
                    FragilityLevel = "Medium",
                    LengthCm = 0,
                    WidthCm = 0,
                    HeightCm = 0,
                    WeightKg = 0
                };
                _db.Products.Add(product);
                await _db.SaveChangesAsync(); // This creates the record and generates a real ID
            }

            // Assign the real database ID (not 0) to the history record
            history.ProductId = product.Id;

            // Now the database will allow the save because the ProductId is valid
            _db.PackageHistories.Add(history);
            await _db.SaveChangesAsync();
        }

        public async Task<List<PackageHistory>> GetRecentHistoryAsync(int count = 50)
        {
            return await _db.PackageHistories.OrderByDescending(h => h.PackedAt).Take(count).ToListAsync();
        }

        public async Task<object> GetHistoryAnalyticsAsync()
        {
            var allHistory = await _db.PackageHistories.ToListAsync();
            var today = DateTime.UtcNow.Date;
            var startOfMonth = new DateTime(today.Year, today.Month, 1);

            // 1. Calculate Today's Stats
            var historyToday = allHistory.Where(h => h.PackedAt.Date == today).ToList();
            int todayCount = historyToday.Count;
            int acceptedToday = historyToday.Count(h => h.AiUsed == "Yes");
            int overridesToday = todayCount - acceptedToday;

            // 2. Calculate Monthly Stats
            int monthCount = allHistory.Count(h => h.PackedAt >= startOfMonth);

            // 3. Calculate Overall AI Accuracy
            int total = allHistory.Count;
            int totalAccepted = allHistory.Count(h => h.AiUsed == "Yes");

            // 4. Group for Daily Chart (Last 7 Days)
            var daily = allHistory.GroupBy(h => h.PackedAt.Date)
                .OrderBy(g => g.Key)
                .TakeLast(7)
                .Select(g => new { label = g.Key.ToString("ddd"), value = g.Count() })
                .ToList();

            return new {
                todayCount = todayCount,                 // For "Today's Packages" card
                monthCount = monthCount,                 // For "This Month's Packages" card
                totalAccepted = totalAccepted,           // For "Accepted Recommendations" row
                totalOverrides = total - totalAccepted,  // For "Overrides" row
                acceptanceRate = total > 0 ? Math.Round((double)totalAccepted / total * 100, 1) : 0,
                acceptanceRateToday = todayCount > 0 ? Math.Round((double)acceptedToday / todayCount * 100, 1) : 0,
                daily = daily
            };
        }
    }
}