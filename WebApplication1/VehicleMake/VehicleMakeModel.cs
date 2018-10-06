using Project.Model.Common;
using System;

namespace VehicleMake
{
    public class VehicleMakeModel : IVehicleMakeModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Abrv { get; set; }
    }
}
