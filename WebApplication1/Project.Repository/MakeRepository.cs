using AutoMapper;
using Microsoft.CodeAnalysis;

using Project.DAL.DatabaseSpecific;
using Project.DAL.EntityClasses;
using Project.DAL.Linq;
using Project.Model.Common;
using Project.Repository.Common;
using SD.LLBLGen.Pro.LinqSupportClasses;
using SD.LLBLGen.Pro.QuerySpec;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VehicleMake;
using X.PagedList;

namespace Project.Repository
{
    public class MakeRepository: IMakeRepository
    {
        private const string ConnectionString = @"data source=DESKTOP-K7BKMEJ\SQLEXPRESS;initial catalog=Vehicle;integrated security=SSPI;persist security info=False;packet size=4096";
        private readonly IMapper Mapper;
        public MakeRepository (IMapper mapper)
        {
            Mapper = mapper;
        }
        public async Task<IPagedList<VehicleMakeModel>> GetPagedVehicleMake(IFilter filter)
        {
    
            IQueryable<VehicleMakeEntity> query;
            filter.TotalCount = 0;
            using (var adapter = new DataAccessAdapter(ConnectionString))
            {

                LinqMetaData metaData = new LinqMetaData(adapter);

                query = metaData.VehicleMake.AsQueryable();
                query = filter.IsAscending == false ? query.OrderByDescending(x => x.Name) : query.OrderBy(x => x.Name);

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
                var enumerableQuery = query.AsEnumerable();
                var mappedQuery = Mapper.Map<IEnumerable<VehicleMakeEntity>, IEnumerable<VehicleMakeModel>>(enumerableQuery);
                //Mapper.ConfigurationProvider.AssertConfigurationIsValid();
                return new StaticPagedList<VehicleMakeModel>(mappedQuery, filter.PageNumber, filter.PageSize, filter.TotalCount);
            }

            
            
        }

        public async Task<VehicleMakeModel> GetByIdAsync(int id)
        {
        
           
            using (var adapter = new DataAccessAdapter(ConnectionString))
            {
                LinqMetaData metaData = new LinqMetaData(adapter);
               var entity = await metaData.VehicleMake.SingleAsync(v => v.Id == id);
                return Mapper.Map<VehicleMakeEntity, VehicleMakeModel>(entity);
            }
           
        }

        public async Task<bool> CreateAsync(VehicleMakeModel domainModel)
        {
            
            using (var adapter = new DataAccessAdapter(ConnectionString))
            {
                var entity = Mapper.Map<VehicleMakeModel, VehicleMakeEntity>(domainModel);
                return await adapter.SaveEntityAsync(entity);
            }
          
        }

        public async Task<bool> UpdateAsync(VehicleMakeModel domainModel)
        {
            
            using (var adapter = new DataAccessAdapter(ConnectionString))
            {
                var entity = Mapper.Map<VehicleMakeModel, VehicleMakeEntity>(domainModel);
                entity.IsNew = false;
                return await adapter.SaveEntityAsync(entity);
            }

        }

        public async Task<bool> DeleteAsync (int id)
        {
            VehicleMakeEntity entity = new VehicleMakeEntity(id);
            using (var adapter = new DataAccessAdapter(ConnectionString))
            {
                return await adapter.DeleteEntityAsync(entity);
            }
            
        }
    }
}
