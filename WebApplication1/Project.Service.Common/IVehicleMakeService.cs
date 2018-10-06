using Project.Model.Common;
using Project.Repository.Common;
using System;
using System.Threading.Tasks;
using VehicleMake;
using X.PagedList;

namespace Project.Service.Common
{
    public interface IVehicleMakeService
    {
        Task<IPagedList<VehicleMakeModel>> GetPagedVehicleMake(IFilter filter);
        Task<bool> CreateAsync(VehicleMakeModel domainModel);
        Task<VehicleMakeModel> GetByIdAsync(int id);
        Task<bool> UpdateAsync(VehicleMakeModel domainModel);
        Task<bool> DeleteAsync(int id);
    }
}
