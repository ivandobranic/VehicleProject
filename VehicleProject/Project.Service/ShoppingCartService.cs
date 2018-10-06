using System;
using System.Text;
using System.Threading.Tasks;
using Project.DAL.Models;
using Project.Repository.Common;
using Project.Service.Common;

namespace Project.Service
{
    public class ShoppingCartService : IShoppingCartService
    {
        ICartRepository CartRepository;
        IPaymentRepository PaymentRepository;
        ICardPaymentService CardPaymentService;
        IFileWriterService FileWriterService;
        IMailSender MailSender;
        public ShoppingCartService(ICartRepository cartRepository, IPaymentRepository paymentRepository, 
            ICardPaymentService cardPaymentService, IFileWriterService fileWriterService, IMailSender mailSender)
        {
            CartRepository = cartRepository;
            PaymentRepository = paymentRepository;
            CardPaymentService = cardPaymentService;
            FileWriterService = fileWriterService;
            MailSender = mailSender;
        }
        public async Task PlaceOrder(OrderDetails details)
        {
            string cardPayment = CardPaymentService.CardTypePayment(details.CardType, details.CardNumber);

            bool isSuccess = await PaymentRepository.IsPaymentSuccess(details.UserName, details.TotalPrice);
            if (isSuccess)
            {
                int i = 1;
                StringBuilder sb = new StringBuilder(cardPayment);
               
                foreach ( var item in details.ItemsOrdered)
                {
                    sb.Append("\r\n");
                    sb.Append("Item #");
                    sb.Append(i.ToString());
                    sb.Append("\r\n");
                    sb.Append("Name: ");
                    sb.Append(item.VehicleMake);
                    sb.Append("\r\n");
                    sb.Append("Model: ");
                    sb.Append(item.VehicleModel);
                    sb.Append("\r\n");
                    sb.Append("Price: ");
                    sb.Append(item.Price);
                    sb.Append("\r\n");
                    sb.Append("Ordered By: ");
                    sb.Append(item.UserName);
                    i++;
                }
                sb.Append("\r\n");
                sb.Append("\r\n");
                sb.Append("Shipping Adress: ");
                sb.Append(details.Adress);
                sb.Append("\r\n");
                sb.Append("Total Price: ");
                sb.Append(details.TotalPrice);
                sb.Append("\r\n");
                sb.Append("Date: ");
                sb.Append(DateTime.Now.ToShortDateString());
                sb.Append("\r\n");
                sb.Append("----------------------------------------------------");
                sb.Append("\r\n");


                await FileWriterService.WriteOrderToFileAsync(sb.ToString());
                MailSender.SendOrderMail(details.Email, sb.ToString());
                await CartRepository.RemoveAllItemsFromCart(details.UserName);

            }
          
        }
        public async Task<Cart> AddItemToCart(Cart cart)
        {
           return await CartRepository.AddItemToCart(cart);
        }
        public async Task<int> RemoveItemFromCart(int id)
        {
            return await CartRepository.RemoveItemFromCart(id);
        }


        public async Task<object> GetTotalItems(string userName)
        {
            return await CartRepository.GetTotalItems(userName);
        }

    }
}