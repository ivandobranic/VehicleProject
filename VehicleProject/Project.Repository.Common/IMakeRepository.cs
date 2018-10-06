using System.Threading.Tasks;
using X.PagedList;
using Project.DAL.Models;

namespace Project.Repository.Common
{
    public interface IMakeRepository
    {
        Task<VehicleMake> GetByIdAsync(int id);
        Task<int> InsertAsync(VehicleMake domainModel);
        Task<int> UpdateAsync(VehicleMake domainModel);
        Task<int> DeleteAsync(int id);
        Task<IPagedList<VehicleMake>> GetPagedMake(IFilter filter);
    }
}