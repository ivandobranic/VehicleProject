using System.Threading.Tasks;
using X.PagedList;
using Project.DAL.Models;
using Project.Repository.Common;

namespace Project.Service.Common
{
    public interface IVehicleMakeService
    {
        Task<VehicleMake> GetByIdAsync(int id);
        Task<int> CreateAsync(VehicleMake vehicleMake);
        Task<int> UpdateAsync (VehicleMake vehicleMake);
        Task<int> DeleteAsync(int id);
        Task<IPagedList<VehicleMake>> GetPagedList(IFilter filter);
    }
}