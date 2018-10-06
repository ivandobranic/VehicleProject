using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using X.PagedList;
using Project.DAL.Models;
using Project.Repository.Common;
using Project.Service.Common;

namespace Project.Service
{
    public class VehicleMakeService : IVehicleMakeService
    {

        IMakeRepository VehicleMakeRepository;
        public VehicleMakeService(IMakeRepository vehicleMakeRepository)
        {
            this.VehicleMakeRepository = vehicleMakeRepository;
        }


        public async Task<VehicleMake> GetByIdAsync(int id)
        {

            return await VehicleMakeRepository.GetByIdAsync(id);
               
        }

        public async Task<int> CreateAsync(VehicleMake vehicleMake)
        {
            return await VehicleMakeRepository.InsertAsync(vehicleMake);
         
        }

        public async Task<int> UpdateAsync(VehicleMake vehicleMake)
        {
            
          return await VehicleMakeRepository.UpdateAsync(vehicleMake);
            
        }

        public async Task<int> DeleteAsync(int id)
        {
           return await VehicleMakeRepository.DeleteAsync(id);
           
        }

        public async Task<IPagedList<VehicleMake>> GetPagedList(IFilter filter)
        {
            return await VehicleMakeRepository.GetPagedMake(filter);
        }
    }
}