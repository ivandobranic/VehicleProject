using Project.Service.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project.Service
{
    public class CardPaymentService: ICardPaymentService
    {
        public string CardTypePayment(string cardType, string cardNumber)
        {
            string index = cardNumber.Substring(0, 12);
            string maskedCardNumber = cardNumber.Replace(index, "**************");
            if(cardType == "MasterCard")
            {
                return "Payment Type: MasterCard\r\n" + "Card Number: "  + maskedCardNumber;
            }
            return "Payment Type: Visa\r\n" + "Card Number: " + maskedCardNumber;

        }
    }
}
