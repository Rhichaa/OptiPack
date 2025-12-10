using System.Collections.Generic;
using System.Threading.Tasks;
using OptiPackBackend.Models;

namespace OptiPackBackend.Services.Interfaces
{
    public interface IInventoryService
    {
        Task<List<Box>> GetBoxesAsync();
        Task<List<ProtectiveMaterial>> GetMaterialsAsync();
        Task UpdateBoxStockAsync(int boxId, int delta);
        Task UpdateMaterialStockAsync(int materialId, int delta);
    }
}
