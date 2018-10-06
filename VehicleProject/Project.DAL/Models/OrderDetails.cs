using System;
using System.Collections.Generic;

namespace Project.DAL.Models
{
  public class OrderDetails
  {
        public int Id {get; set;}
        public string UserName {get; set;}
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string Email {get; set;}
        public string Adress {get; set;}
        public string CardNumber {get; set;}
        public string CardType {get; set;}
        public List<Cart> ItemsOrdered {get; set;}
        public float TotalPrice {get; set;}
  }
}