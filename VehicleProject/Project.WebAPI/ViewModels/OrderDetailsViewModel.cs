using System.Collections.Generic;
using Project.DAL.Models;

namespace Project.WebAPI.ViewModels
{
    public class OrderDetailsViewModel
    {
        public int Id {get; set;}
        public string UserName {get; set;}
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string Email {get; set;}
        public string ShippingAdress {get; set;}
        public string CardNumber {get; set;}
        public string CardType {get; set;}
        List<Cart> ItemsOrdered {get; set;}
        public float TotalPrice {get; set;}
    }
}