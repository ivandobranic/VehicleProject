using Project.DAL.Models;

namespace Project.WebAPI.ViewModels
{
    public class VehiclesForSaleViewModel
    {
        public int Id {get; set;}
        public int StockId { get; set; }
        public string VehicleMake {get; set;}
        public string VehicleModel {get; set;}
        public byte[] VehiclePicture {get; set;}
        public int Price {get;set;}
        public int ItemsInStockId { get; set; }
        public int ItemsInStock {get; set;}

    }
}