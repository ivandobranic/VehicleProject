using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Linq;
using System.Threading.Tasks;
using X.PagedList;
using Project.DAL.Models;
using Project.Repository.Common;

namespace Project.Repository
{
    public class VehiclesForSaleRepository : IVehiclesForSaleRepository
    {
        private IUnitOfWork UnitOfWork;
        VehicleContext Context;
        DbSet<VehiclesForSale> SaleEntities;
        public VehiclesForSaleRepository (IUnitOfWork unitOfWork, VehicleContext context)
        {
            this.UnitOfWork = unitOfWork;
            this.Context = context;
            SaleEntities = Context.Set<VehiclesForSale>();
            
        }

        public async Task<VehiclesForSale> GetByIdAsync(int id)
        {

            return await SaleEntities.FindAsync(id);
             
        }

        public async Task<int> InsertAsync(VehiclesForSale entity)
        {
            await SaleEntities.AddAsync(entity);
            return await Context.SaveChangesAsync();
        }

        public async Task<int> UpdateAsync(VehiclesForSale entity)
        {
           
            return await UnitOfWork.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await SaleEntities.FindAsync(id);
            Context.Entry(entity).State = EntityState.Deleted;
            Context.SaveChanges();
        }
        public async Task<IPagedList<VehiclesForSale>>GetPagedMake(IFilter filter)
        {
            var query = SaleEntities.AsQueryable();
            
            query = filter.IsAscending ==  false ? query.OrderByDescending(x => x.VehicleMake) : query.OrderBy(x => x.VehicleMake);
            if (!string.IsNullOrEmpty(filter.Search))
            {
                filter.TotalCount = await query.Where(x => x.VehicleMake == filter.Search).CountAsync();
                query = query.Where(x => x.VehicleMake == filter.Search).Skip((filter.PageNumber - 1) * filter.PageSize).Take(filter.PageSize);
            }
            else
            {
                filter.TotalCount = await query.CountAsync();
                query = query.Skip((filter.PageNumber - 1) * filter.PageSize).Take(filter.PageSize);
            }
            
            return new StaticPagedList<VehiclesForSale>(query, filter.PageNumber, filter.PageSize, filter.TotalCount);
        }
    }
}