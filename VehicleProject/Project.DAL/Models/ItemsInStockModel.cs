namespace Project.DAL.Models
{
    public class ItemsInStockModel
    {
        public int Id {get; set;}
        public int ItemsInStock {get; set;}
        public int VehiclesForSaleId {get; set;}
        public VehiclesForSale VehiclesForSale {get; set;}
    }
}