using System.Threading.Tasks;
using Project.DAL.Models;

namespace Project.Repository.Common
{
    public interface ICartRepository
    {
        Task<Cart> AddItemToCart(Cart cart);
        Task<object> GetTotalItems(string userName);
        Task<int> RemoveItemFromCart(int id);
        Task RemoveAllItemsFromCart(string userName);


    }
}