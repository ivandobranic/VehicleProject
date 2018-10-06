using System.Threading.Tasks;
using Project.DAL.Models;

namespace Project.Service.Common
{
    public interface IShoppingCartService
    {
        Task<Cart> AddItemToCart(Cart cart);
        Task<int> RemoveItemFromCart(int id);
        Task<object> GetTotalItems(string userName);
        Task PlaceOrder(OrderDetails details);

    }
}