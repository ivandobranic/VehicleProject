using System.Threading.Tasks;

namespace Project.Repository.Common
{
    public interface IPaymentRepository
    {
        Task<bool> IsPaymentSuccess(string userName, float orderPrice);
    }
}