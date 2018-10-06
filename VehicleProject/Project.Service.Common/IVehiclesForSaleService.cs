using System.Threading.Tasks;
using X.PagedList;
using Project.DAL.Models;
using Project.Repository.Common;

namespace Project.Service.Common
{
    public interface IVehiclesForSaleService
    {
        Task<VehiclesForSale> GetByIdAsync(int id);
        Task<int> CreateAsync(VehiclesForSale model);
        Task<int> UpdateAsync (VehiclesForSale model);
        Task DeleteAsync(int id);
        Task<IPagedList<VehiclesForSale>> GetPagedList(IFilter filter);
    }
}