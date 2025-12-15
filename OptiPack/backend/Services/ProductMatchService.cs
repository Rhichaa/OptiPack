using System.Linq;
using OptiPackBackend.Data;
using OptiPackBackend.Models;

namespace OptiPackBackend.Services
{
    public class ProductMatchService
    {
        private readonly ApplicationDbContext _context;

        public ProductMatchService(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ UPDATED METHOD SIGNATURE (MATCHES YOUR CONTROLLER CALL)
        public ProductMaster? FindBestMatch(
            string label,
            string category,
            float length,
            float width,
            float height,
            float weight
        )
        {
            // 1️⃣ First try exact product name match
            var exactMatch = _context.ProductMaster
                .Where(p => p.ProductName.ToLower() == label.ToLower())
                .FirstOrDefault();

            if (exactMatch != null)
                return exactMatch;

            // 2️⃣ Fallback: category + size + weight match
            var categoryMatch = _context.ProductMaster
                .Where(p => p.Category == category)
                .Where(p =>
                    p.Length >= length &&
                    p.Width >= width &&
                    p.Height >= height &&
                    p.Weight >= weight
                )
                .OrderBy(p => p.Length * p.Width * p.Height)
                .FirstOrDefault();

            return categoryMatch;
        }
    }
}