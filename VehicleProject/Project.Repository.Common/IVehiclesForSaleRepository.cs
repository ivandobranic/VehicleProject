using System.Threading.Tasks;
using X.PagedList;
using Project.DAL.Models;

namespace Project.Repository.Common
{
    public interface IVehiclesForSaleRepository
    {
        Task<VehiclesForSale> GetByIdAsync(int id);
        Task<int> InsertAsync(VehiclesForSale model);
        Task<int> UpdateAsync(VehiclesForSale model);
        Task DeleteAsync(int id);
        Task<IPagedList<VehiclesForSale>> GetPagedMake(IFilter filter);
    }
}