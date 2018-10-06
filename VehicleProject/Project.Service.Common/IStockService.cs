using System.Collections.Generic;
using System.Threading.Tasks;
using Project.DAL.Models;

namespace Project.Service.Common
{
    public interface IStockService
    {
        Task<ItemsInStockModel> AddAsync(ItemsInStockModel model);
        Task RemoveAsync (int id);
        Task<List<ItemsInStockModel>> GetAllAsync();
        Task<ItemsInStockModel> GetByIdAsync(int id);
        Task<int> UpdateAsync (ItemsInStockModel model);
       

    }
}