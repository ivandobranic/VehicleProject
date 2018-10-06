using System;
using System.Collections.Generic;

namespace Project.DAL.Models
{
    public partial class VehicleModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MakeId { get; set; }
        public string Abrv { get; set; }

        public VehicleMake Make { get; set; }
    }
}
