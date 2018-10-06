using System.Collections.Generic;
using System.Threading.Tasks;
using Project.DAL.Models;
using Project.Repository.Common;
using Project.Service.Common;

namespace Project.Service
{
    public class ItemsInStockservice: IStockService
    {
       private IStockRepository ItemsInStockRepository;

       public ItemsInStockservice (IStockRepository itemsInStockRepository)
       {
           ItemsInStockRepository = itemsInStockRepository;
       }
       public async Task<ItemsInStockModel> AddAsync(ItemsInStockModel model)
       {
          return await ItemsInStockRepository.AddAsync(model);
       }

        public async Task<ItemsInStockModel> GetByIdAsync(int id)
        {
            return await ItemsInStockRepository.GetByIdAsync(id);
        }

        public async Task RemoveAsync (int id)
       {
           await ItemsInStockRepository.DeleteAsync(id);
       }

       public async Task<List<ItemsInStockModel>> GetAllAsync()
       {
           return await ItemsInStockRepository.GetAllAsync();
       }

       
       public async Task<int> UpdateAsync (ItemsInStockModel model)
       {
          return await ItemsInStockRepository.UpdateAsync(model);
       }

    }
}