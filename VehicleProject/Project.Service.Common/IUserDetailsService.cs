using System.Collections;
using System.Threading.Tasks;
using Project.DAL.Models;

namespace Project.Service.Common
{
    public interface IUserDetailsService
    {
       //Test
        Task<UserDetails> Authenticate(string username, string password);
        Task<IList> GetAllAsync();
        Task<UserDetails> GetByIdAsync(int id);
        Task<UserDetails> GetAdminDetails(string name);
        Task<UserDetails> InsertAsync(UserDetails model, string password);
        Task<int> UpdateAsync(UserDetails model, string password);
        Task<int> DeleteAsync(int id);
    }
}