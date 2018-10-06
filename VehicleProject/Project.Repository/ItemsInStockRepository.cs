using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Project.DAL.Models;
using Project.Repository.Common;

namespace Project.Repository
{
    public class ItemsInStockRepository: IStockRepository
    {
       
        private IUnitOfWork UnitOfWork;
        private readonly VehicleContext Context;
        DbSet<ItemsInStockModel> StockEntities;
        public ItemsInStockRepository(IUnitOfWork unitOfWork, VehicleContext context)
        {
            UnitOfWork = unitOfWork;
            Context = context;
            StockEntities = Context.Set<ItemsInStockModel>();
        }

        public async Task<List<ItemsInStockModel>> GetAllAsync()
        {
            int count = await StockEntities.CountAsync();
            if (count != 0)
            {
                return await StockEntities.ToListAsync();
            }
            throw new ArgumentException("Item Out Of Stock!");
        }

        public async Task<ItemsInStockModel> GetByIdAsync(int id)
        {
            return await StockEntities.FirstAsync(x => x.VehiclesForSaleId == id);
        }

        public async Task<ItemsInStockModel> AddAsync(ItemsInStockModel model)
        {
            await StockEntities.AddAsync(model);
            await Context.SaveChangesAsync();
            return model;
        }

        public async Task DeleteAsync (int id)
        {
            var entity = await StockEntities.FindAsync(id);
            Context.Entry(entity).State = EntityState.Deleted;
            await Context.SaveChangesAsync();
        }

        public async Task<int> UpdateAsync (ItemsInStockModel model)
        {
            if (model.ItemsInStock > -1)
            {
                Context.Entry(model).State = EntityState.Modified;
                return await Context.SaveChangesAsync();
            }
            throw new ArgumentException("Item Out Of Stock");
            
           
             
        }
    }
}