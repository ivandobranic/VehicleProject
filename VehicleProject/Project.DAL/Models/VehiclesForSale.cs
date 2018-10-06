using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Project.DAL.Models
{
    public partial class VehiclesForSale
    {
        public int Id {get; set;}
        public string VehicleMake {get; set;}
        public string VehicleModel {get; set;}
        public byte[] VehiclePicture {get; set;}
        public int Price {get;set;}
        public ItemsInStockModel ItemsInStockModel {get; set;}
        public ICollection<Cart> Cart { get; set; }

    }
}