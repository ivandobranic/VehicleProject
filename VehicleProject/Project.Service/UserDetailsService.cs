using System.Collections;
using System.Threading.Tasks;
using Project.DAL.Models;
using Project.Repository.Common;
using Project.Service.Common;

namespace Project.Service
{
    public class UserDetailsService : IUserDetailsService
    {
        private IUserDetailsRepository Detailsrepository;
        public UserDetailsService (IUserDetailsRepository detailsRepository)
        {
            Detailsrepository = detailsRepository;
        }
        public async Task<UserDetails> Authenticate(string userName, string password)
        {
            return await Detailsrepository.Authenticate(userName, password);
        }
        public async Task<int> DeleteAsync(int id)
        {
            return await Detailsrepository.DeleteAsync(id);
        }

        public async Task<IList> GetAllAsync()
        {
           return await Detailsrepository.GetAllAsync();
        }

        public async Task<UserDetails> GetByIdAsync(int id)
        {
           return await Detailsrepository.GetByIdAsync(id);
        }

        public async Task<UserDetails> GetAdminDetails(string name)
        {
            return await Detailsrepository.GetAdminDetails(name);
        }

        public async Task<UserDetails> InsertAsync(UserDetails model, string password)
        {
            return await Detailsrepository.InsertAsync(model, password);
        }
        public async Task<int> UpdateAsync(UserDetails model, string password)
        {
            return await Detailsrepository.UpdateAsync(model, password);
        }
    }
}