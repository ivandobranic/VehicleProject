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
    public class VehicleMakeRepository : IMakeRepository
    {
      
        private readonly IRepository<VehicleMake> Repository;
        public VehicleMakeRepository (IRepository<VehicleMake> repository)
        {
            this.Repository = repository;
           
        }

        public async Task<VehicleMake> GetByIdAsync(int id)
        {
          
           return await Repository.GetByIdAsync(id);
             
        }

        public async Task<int> InsertAsync(VehicleMake entity)
        {
          
            return await Repository.InsertAsync(entity);

        }

        public async Task<int> UpdateAsync(VehicleMake entity)
        {
           
            return await Repository.UpdateAsync(entity);
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await Repository.DeleteAsync(id);
        }
        public async Task<IPagedList<VehicleMake>>GetPagedMake(IFilter filter)
        {
            var query = Repository.Get();
        
            query = filter.IsAscending ==  false ? query.OrderByDescending(x => x.Name) : query.OrderBy(x => x.Name);
            if (!string.IsNullOrEmpty(filter.Search))
            {
                filter.TotalCount = await query.Where(x => x.Name == filter.Search).CountAsync();
                query = query.Where(x => x.Name == filter.Search).Skip((filter.PageNumber - 1) * filter.PageSize).Take(filter.PageSize);
            }
            else
            {
                filter.TotalCount = await query.CountAsync();
                query = query.Skip((filter.PageNumber - 1) * filter.PageSize).Take(filter.PageSize);
            }
            
            return new StaticPagedList<VehicleMake>(query, filter.PageNumber, filter.PageSize, filter.TotalCount);
        }
    }
}