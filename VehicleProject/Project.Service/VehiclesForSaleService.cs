using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using X.PagedList;
using Project.DAL.Models;
using Project.Repository.Common;
using Project.Service.Common;

namespace Project.Service
{
    public class VehiclesForSaleService : IVehiclesForSaleService
    {

        IVehiclesForSaleRepository VehiclesForSaleRepository;
        public VehiclesForSaleService(IVehiclesForSaleRepository VehiclesForSaleRepository)
        {
            this.VehiclesForSaleRepository = VehiclesForSaleRepository;
        }


        public async Task<VehiclesForSale> GetByIdAsync(int id)
        {

            return await VehiclesForSaleRepository.GetByIdAsync(id);
               
        }

        public async Task<int> CreateAsync(VehiclesForSale model)
        {
            return await VehiclesForSaleRepository.InsertAsync(model);
         
        }

        public async Task<int> UpdateAsync(VehiclesForSale model)
        {
            
          return await VehiclesForSaleRepository.UpdateAsync(model);
            
        }

        public async Task DeleteAsync(int id)
        {
           await VehiclesForSaleRepository.DeleteAsync(id);
           
        }

        public async Task<IPagedList<VehiclesForSale>> GetPagedList(IFilter filter)
        {
            return await VehiclesForSaleRepository.GetPagedMake(filter);
        }
    }
}