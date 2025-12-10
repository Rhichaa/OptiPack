using OptiPackBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OptiPackBackend.Services.Interfaces
{
    public interface IHistoryService
    {
        Task LogPackagingAsync(PackageHistory history);
        Task<List<PackageHistory>> GetRecentHistoryAsync(int count = 50);
    }
}
