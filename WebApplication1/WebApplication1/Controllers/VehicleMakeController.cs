using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.DAL.EntityClasses;
using Project.Repository.Common;
using X.PagedList;
using Project.Model;
using Project.WebAPI.Models;
using AutoMapper;
using Project.Model.Common;
using VehicleMake;
using Project.Service.Common;

namespace Project.WebAPI.Controllers
{
    public class VehicleMakeController : Controller
    {
        IVehicleMakeService MakeService;
        private readonly IMapper Mapper;
        IFilter Filter;
        public VehicleMakeController(IVehicleMakeService makeService, IMapper mapper, IFilter filter)
        {
            MakeService = makeService;
            Mapper = mapper;
            Filter = filter;
        }
        // GET: VehicleMake
        public async Task<ActionResult> Index(string search, int? pageNumber, bool isAscending = false)
        {
            Filter.IsAscending = isAscending;
            Filter.Search = search;
            Filter.PageNumber = pageNumber ?? 1;
            var pagedList = await MakeService.GetPagedVehicleMake(Filter);
            var newPagedList = pagedList.ToList();
            var model = Mapper.Map<List<VehicleMakeModel>, List<VehicleMakeViewModel>>(newPagedList);
            //Mapper.ConfigurationProvider.AssertConfigurationIsValid();
            var paged = new StaticPagedList<VehicleMakeViewModel>(model, pageNumber ?? 1, Filter.PageSize, Filter.TotalCount);
            ViewBag.sortOrder = isAscending ? false : true;
            return View(paged);
        }

        // GET: VehicleMake/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: VehicleMake/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: VehicleMake/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(VehicleMakeViewModel model)
        {
            try
            {
                var vehicle = Mapper.Map<VehicleMakeViewModel, VehicleMakeModel>(model);
                await MakeService.CreateAsync(vehicle);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: VehicleMake/Edit/5
        public async Task<ActionResult> Edit(int id)
        {
            var entity = await MakeService.GetByIdAsync(id);
           var model = Mapper.Map<VehicleMakeModel, VehicleMakeViewModel>(entity);
            return View(model);
        }

        // POST: VehicleMake/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(VehicleMakeViewModel model)
        {
            try
            {
                var vehicle = Mapper.Map<VehicleMakeViewModel, VehicleMakeModel>(model);
                await MakeService.UpdateAsync(vehicle);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: VehicleMake/Delete/5
        public async Task<ActionResult> Delete(int id)
        {
            VehicleMakeViewModel model = new VehicleMakeViewModel();
            var vehicle = await MakeService.GetByIdAsync(id);
            model = Mapper.Map<VehicleMakeModel, VehicleMakeViewModel>(vehicle);
            return View(model);
        }

        // POST: VehicleMake/Delete/5
        [HttpPost]
        [ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            
            try
            {

               await MakeService.DeleteAsync(id);

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}