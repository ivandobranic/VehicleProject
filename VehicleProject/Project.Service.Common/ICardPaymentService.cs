using System;
using System.Collections.Generic;
using System.Text;

namespace Project.Service.Common
{
    public interface ICardPaymentService
    {
        string CardTypePayment(string cardType, string cardNumber);
    }
}
