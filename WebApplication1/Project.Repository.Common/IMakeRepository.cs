using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Project.DAL.EntityClasses;
using Project.Model.Common;
using VehicleMake;
using X.PagedList;

namespace Project.Repository.Common
{
    public interface IMakeRepository
    {
        Task<IPagedList<VehicleMakeModel>> GetPagedVehicleMake(IFilter filter);
        Task<bool> CreateAsync(VehicleMakeModel domainModel);
        Task<VehicleMakeModel> GetByIdAsync(int id);
        Task<bool> UpdateAsync(VehicleMakeModel domainModel);
        Task<bool> DeleteAsync(int id);
    }
}
