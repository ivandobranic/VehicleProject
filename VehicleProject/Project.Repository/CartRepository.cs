using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Project.DAL.Models;
using Project.Repository.Common;

namespace Project.Repository
{
    public class CartRepository : ICartRepository
    {
        private readonly VehicleContext Context;
        private DbSet<Cart> CartEntities;
        private DbSet<ItemsInStockModel> StockEntities;

        public CartRepository(VehicleContext context)
        {
            Context = context;
            CartEntities = Context.Set<Cart>();
            StockEntities = Context.Set<ItemsInStockModel>();
        }

        public async Task<object> GetTotalItems(string userName)
        {

            float result = 0;
            foreach (var entity in CartEntities.Where(x => x.UserName == userName))
            {
                result += entity.Price;
            }

            var cartList = await CartEntities.Where(x => x.UserName == userName).ToListAsync();
            return new {
                CartList = cartList,
                Result = result
            };
        }

        public async Task<Cart> AddItemToCart(Cart product)
        {
            var item = await StockEntities.FirstAsync(x => x.VehiclesForSaleId == product.VehiclesForSaleId);
            if (item.ItemsInStock >= product.Quantity)
            {
                product.Id = 0;

                await CartEntities.AddAsync(product);
                await Context.SaveChangesAsync();
                return product;

            }
            throw new ArgumentException("Item out of stock!");

        }


        public async Task<int> RemoveItemFromCart(int id)
        {
            int totalCount = await CartEntities.CountAsync();
            if (totalCount == 0)
            {
                throw new ArgumentException("There are no items in the cart!");
            }
            Cart item = await CartEntities.FindAsync(id);
            Context.Entry(item).State = EntityState.Deleted;
            return await Context.SaveChangesAsync();

        }

        public async Task RemoveAllItemsFromCart(string userName)
        {
            var queryList = await CartEntities.Where(x => x.UserName == userName).ToListAsync();
            foreach (var item in queryList)
            {
                Context.Entry(item).State = EntityState.Deleted;
                await Context.SaveChangesAsync();

            }
        }
      
    }
}