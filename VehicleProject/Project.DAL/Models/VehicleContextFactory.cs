
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Project.DAL.Models
{
    public class VehicleContextFactory : IDesignTimeDbContextFactory<VehicleContext>
    {
        public VehicleContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<VehicleContext>();
            optionsBuilder.UseSqlServer("Server=DESKTOP-K7BKMEJ\\SQLEXPRESS;Database=Vehicle;Trusted_Connection=True;");
            return new VehicleContext(optionsBuilder.Options);
        }
    }
}