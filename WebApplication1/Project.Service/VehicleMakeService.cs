using Project.Model.Common;
using Project.Repository.Common;
using Project.Service.Common;
using System;
using System.Threading.Tasks;
using VehicleMake;
using X.PagedList;

namespace Project.Service
{
    public class VehicleMakeService : IVehicleMakeService
    {
        private IMakeRepository MakeRepository;
        public VehicleMakeService(IMakeRepository makeRepository)
        {
            MakeRepository = makeRepository;
        }
        public async Task<bool> CreateAsync(VehicleMakeModel domainModel)
        {
           return await MakeRepository.CreateAsync(domainModel);
        }

        public async Task<bool> UpdateAsync(VehicleMakeModel domainModel)
        {
            return await MakeRepository.UpdateAsync(domainModel);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await MakeRepository.DeleteAsync(id);
        }

        public async Task<VehicleMakeModel> GetByIdAsync(int id)
        {
           return await MakeRepository.GetByIdAsync(id);
        }

        public async Task<IPagedList<VehicleMakeModel>> GetPagedVehicleMake(IFilter filter)
        {
           return await MakeRepository.GetPagedVehicleMake(filter);
        }

        
    }
}
