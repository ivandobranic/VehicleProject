
using System.Collections.Generic;

namespace Project.DAL.Models
{
    public class Cart
    {
        public int Id {get; set;}
        public int VehiclesForSaleId { get; set; }
        public string UserName {get;set;}
        public int Quantity {get; set;}
        public string VehicleMake {get; set;}
        public string VehicleModel {get; set;}
        public float Price {get; set;}
        public VehiclesForSale VehiclesForSale { get; set; }
        
       
    }
}