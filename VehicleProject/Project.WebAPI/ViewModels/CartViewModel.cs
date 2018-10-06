using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.WebAPI.ViewModels
{
    public class CartViewModel
    {
        public int Id { get; set; }
        public int VehiclesForSaleId { get; set; }
        public string UserName { get; set; }
        public int Quantity { get; set; }
        public string VehicleMake { get; set; }
        public string VehicleModel { get; set; }
        public float Price { get; set; }
        public int ItemsInStock { get; set; }
    }
}
