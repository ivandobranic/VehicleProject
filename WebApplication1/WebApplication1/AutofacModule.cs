using Autofac;
using AutoMapper;
using Project.Repository;
using Project.Repository.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VehicleMake;
using Project.Model.Common;
using Project.Service;
using Project.Service.Common;

namespace Project.WebAPI
{
    public class AutofacModule : Module
    {

        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(c => new VehicleMakeModel())
                .As<IVehicleMakeModel>()
                .InstancePerLifetimeScope();
            builder.Register(c => new VehicleMakeService(c.Resolve<IMakeRepository>()))
                .As<IVehicleMakeService>()
                .InstancePerLifetimeScope();
            builder.Register(c => new MakeRepository(c.Resolve<IMapper>()))
                .As<IMakeRepository>()
                .InstancePerLifetimeScope();
            builder.Register(c => new Filter())
                .As<IFilter>()
                .InstancePerLifetimeScope();

            var profiles =
           from t in typeof(MappingProfile).Assembly.GetTypes()
           where typeof(Profile).IsAssignableFrom(t)
           select (Profile)Activator.CreateInstance(t);

            builder.Register(c => new MapperConfiguration(cfg =>
            {
                foreach (var profile in profiles)
                {
                    cfg.AddProfile(profile);
                }
            }));

            builder.Register(c => c.Resolve<MapperConfiguration>().CreateMapper()).As<IMapper>();


        }
    }
}
