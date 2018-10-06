using System.Collections.Generic;
using System.Threading.Tasks;
using Project.DAL.Models;

namespace Project.Repository.Common
{
    public interface IStockRepository
    {
        Task<ItemsInStockModel> AddAsync(ItemsInStockModel model);
        Task<List<ItemsInStockModel>> GetAllAsync();
        Task<ItemsInStockModel> GetByIdAsync(int id);
        Task DeleteAsync (int id);
        Task<int> UpdateAsync (ItemsInStockModel model);
    }
}