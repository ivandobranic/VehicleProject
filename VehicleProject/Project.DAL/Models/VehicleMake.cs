using System;
using System.Collections.Generic;

namespace Project.DAL.Models
{
    public partial class VehicleMake
    {
        public VehicleMake()
        {
            VehicleModel = new HashSet<VehicleModel>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Abrv { get; set; }
        public string CreatedBy {get; set;}

        public ICollection<VehicleModel> VehicleModel { get; set; }
    }
}
