using System;
using Project.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Linq;
using System.Threading.Tasks;
using Project.Repository.Common;

namespace Project.Repository
{
   public class GenericRepository<TEntity> : IRepository<TEntity>
     where TEntity : class
    {

        private readonly VehicleContext Context;
        private DbSet<TEntity> Entities;
        public GenericRepository(VehicleContext context)
        {
            this.Context = context;
            Entities = Context.Set<TEntity>();

        }


        public IQueryable<TEntity> Get()
        {
            return Entities;
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {

            return await Entities.FindAsync(id);

        }

        public async Task<int> InsertAsync(TEntity entity)
        {
            
                if (entity == null)
                {
                    throw new ArgumentException("entity");
                }
                Entities.Add(entity);
               return await Context.SaveChangesAsync();
          

        }

        public async Task<int> UpdateAsync(TEntity entity)
        {
           
                if (entity == null)
                {
                    throw new ArgumentException("entity");
                }
                Context.Entry(entity).State = EntityState.Modified;
                return await Context.SaveChangesAsync();
          
        }

        public async Task<int> DeleteAsync(int id)
        {
          
                var entity = await Entities.FindAsync(id);
                if (entity == null)
                {
                    throw new ArgumentNullException("entity");
                }
                Context.Entry(entity).State = EntityState.Deleted;
                return await Context.SaveChangesAsync();
        }
    }
}
