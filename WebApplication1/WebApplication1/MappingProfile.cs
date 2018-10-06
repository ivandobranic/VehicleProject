using AutoMapper;
using Project.DAL.EntityClasses;
using Project.Model.Common;
using Project.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VehicleMake;

namespace Project.WebAPI
{
    public class MappingProfile : Profile
    {

        public MappingProfile()
        {


            //CreateMap<IVehicleMakeModel, VehicleMakeEntity>()
            //.ForMember(x => x.IsDirty, opts => opts.Ignore())
            //.ForMember(x => x.IsNew, opts => opts.Ignore())
            //.ForMember(x => x.VehicleModels, opts => opts.Ignore())
            //.ForMember(x => x.Fields, opts => opts.Ignore())
            //.ForMember(x => x.ConcurrencyPredicateFactoryToUse, opts => opts.Ignore())
            //.ForMember(x => x.Validator, opts => opts.Ignore())
            //.ForMember(x => x.ActiveContext, opts => opts.Ignore())
            //.ForMember(x => x.AuditorToUse, opts => opts.Ignore())
            //.ForMember(x => x.AuthorizerToUse, opts => opts.Ignore()).ReverseMap();

            //CreateMap<IVehicleMakeModel, VehicleMakeViewModel>().ReverseMap();

            CreateMap<VehicleMakeViewModel, VehicleMakeModel>().ReverseMap();
            CreateMap<VehicleMakeModel, VehicleMakeEntity>()
                .ForMember(x => x.IsDirty, opts => opts.Ignore())
                .ForMember(x => x.IsNew, opts => opts.Ignore())
                .ForMember(x => x.VehicleModels, opts => opts.Ignore())
                .ForMember(x => x.Validator, opts => opts.Ignore())
                .ForMember(x => x.ActiveContext, opts => opts.Ignore())
                .ForMember(x => x.AuditorToUse, opts => opts.Ignore())
                .ForMember(x => x.ConcurrencyPredicateFactoryToUse, opts => opts.Ignore())
                .ForMember(x => x.Fields, opts => opts.Ignore())
                .ForMember(x => x.AuthorizerToUse, opts => opts.Ignore()).ReverseMap();


        }
    }
}
