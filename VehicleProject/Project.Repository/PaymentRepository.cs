using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Project.DAL.Models;
using Project.Repository.Common;

namespace Project.Repository
{
    public class PaymentRepository: IPaymentRepository
    {

     private readonly VehicleContext Context;
     private DbSet<CustomerBankAccount> Entities;
     public PaymentRepository(VehicleContext context)
     {
         Context = context;
         Entities = Context.Set<CustomerBankAccount>();
     }
        public async Task<bool> IsPaymentSuccess(string userName, float orderPrice)
        {
            CustomerBankAccount accountBalance = await Entities.FirstAsync(x => x.UserName == userName);
            if (orderPrice <= accountBalance.AccountBalance)
            {
                return true;
            }
            throw new ArgumentException("You have insufficient funds on your bank account!");
        }

    }
}