using System.Collections;
using System.Threading.Tasks;
using Project.DAL.Models;

namespace Project.Repository.Common
{
    public interface IUserDetailsRepository
    {
        Task<UserDetails> Authenticate(string username, string password);
        Task<IList> GetAllAsync();
        Task<UserDetails> GetByIdAsync(int id);
        Task<UserDetails> GetAdminDetails(string name);
        Task<UserDetails> InsertAsync(UserDetails model, string password);
        Task<int> UpdateAsync(UserDetails model, string password);
        Task<int> DeleteAsync(int id);

    }
}