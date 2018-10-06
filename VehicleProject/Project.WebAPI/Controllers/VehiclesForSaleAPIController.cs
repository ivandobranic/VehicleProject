using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.Repository.Common;
using Project.Service.Common;
using Project.DAL.Models;
using X.PagedList;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Internal;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http.Headers;
using Project.WebAPI.ViewModels;

namespace Project.WebAPI.Controllers
{
    [Produces("application/json")]
    //[Authorize]
    public class VehiclesForSaleAPIController : Controller
    {
        IVehiclesForSaleService VehiclesForSaleService;
        IStockService ItemsInStockService;
        IFilter Filter;
        IHostingEnvironment Hosting;
        IUnitOfWork UnitOfWork;
        public VehiclesForSaleAPIController(IVehiclesForSaleService VehiclesForSaleService, IFilter filter,
        IHostingEnvironment hosting, IStockService itemsInStockService, IUnitOfWork unitOfWork)
        {
            this.VehiclesForSaleService = VehiclesForSaleService;
            ItemsInStockService = itemsInStockService;
            this.Filter = filter;
            this.Hosting = hosting;
            this.UnitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("api/VehiclesForSaleAPI")]
        public async Task<IActionResult> Get(int? pageNumber = null, bool isAscending = false, string search = null)
        {
            try
            {

                Filter.PageNumber = pageNumber ?? 1;
                Filter.Search = search;
                Filter.IsAscending = isAscending;

                var pagedList = await VehiclesForSaleService.GetPagedList(Filter);
                var modelList = pagedList.ToList();
                await ItemsInStockService.GetAllAsync();
                var newList = new List<VehiclesForSaleViewModel>();

                foreach (var item in modelList)
                {
                    var viewModel = new VehiclesForSaleViewModel();
                    viewModel.Id = item.ItemsInStockModel.VehiclesForSaleId;
                    viewModel.ItemsInStock = item.ItemsInStockModel.ItemsInStock;
                    viewModel.ItemsInStockId = item.ItemsInStockModel.Id;
                    viewModel.VehicleMake = item.VehicleMake;
                    viewModel.VehicleModel = item.VehicleModel;
                    viewModel.VehiclePicture = item.VehiclePicture;
                    viewModel.Price = item.Price;
                    newList.Add(viewModel);
                }

                var newModel = new
                {
                    Model = newList,
                    PageNumber = pagedList.PageNumber,
                    PageSize = pagedList.PageSize,
                    TotalCount = pagedList.TotalItemCount,
                    isAscending = Filter.IsAscending
                };

                return Ok(newModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }




        [HttpGet]
        [Route("api/VehiclesForSaleAPI/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
               
                var VehiclesForSale = await VehiclesForSaleService.GetByIdAsync(id);
                var itemsInStockEntity = await ItemsInStockService.GetByIdAsync(id);
                var viewModel = new VehiclesForSaleViewModel();

                viewModel.Id = VehiclesForSale.Id;
                viewModel.VehicleMake = VehiclesForSale.VehicleMake;
                viewModel.VehicleModel = VehiclesForSale.VehicleModel;
                viewModel.VehiclePicture = VehiclesForSale.VehiclePicture;
                viewModel.Price = VehiclesForSale.Price;
                viewModel.ItemsInStock = itemsInStockEntity.ItemsInStock;
                viewModel.StockId = itemsInStockEntity.Id;
                
               
                if (VehiclesForSale == null)
                {
                    return NotFound();
                }


                return Ok(viewModel);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }
        [HttpPost, DisableRequestSizeLimit]
        [Route("api/VehiclesForSaleAPI")]
        public async Task<IActionResult> Post(VehiclesForSaleViewModel viewModel)
        {

            try
            {
                var file = Request.Form.Files[0];

                viewModel.VehicleMake = Request.Form["vehicleMake"].ToString();
                viewModel.VehicleModel = Request.Form["vehicleModel"].ToString();
                viewModel.Price = Convert.ToInt32(Request.Form["price"]);
                viewModel.ItemsInStockId = Convert.ToInt32(Request.Form["itemsInStockId"]);
                viewModel.ItemsInStock = Convert.ToInt32(Request.Form["itemsInStock"]);
                VehiclesForSale model = new VehiclesForSale
                {
                    Id = viewModel.Id,
                    VehicleMake = viewModel.VehicleMake,
                    VehicleModel = viewModel.VehicleModel,
                    VehiclePicture = viewModel.VehiclePicture,
                    Price = viewModel.Price
                };

               
                if (file.Length > 0)
                {


                    ItemsInStockModel stockModel = new ItemsInStockModel();
                    stockModel.ItemsInStock = viewModel.ItemsInStock;
                    stockModel.VehiclesForSaleId = viewModel.ItemsInStockId;
                    stockModel.Id = viewModel.Id;
                    using (var memoryStream = new MemoryStream())
                    {
                        await file.CopyToAsync(memoryStream);
                        model.VehiclePicture = memoryStream.ToArray();
                    }
                    try
                    {
                        await VehiclesForSaleService.CreateAsync(model);
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
                   
                    await ItemsInStockService.AddAsync(stockModel);
                   

                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }



        [HttpPut]
        [Route("api/VehiclesForSaleAPI")]
        public async Task<IActionResult> Put(VehiclesForSaleViewModel viewModel)
        {
            try
            {
                var file = Request.Form.Files[0];

                viewModel.VehicleMake = Request.Form["vehicleMake"].ToString();
                viewModel.VehicleModel = Request.Form["vehicleModel"].ToString();
                viewModel.Price = Convert.ToInt32(Request.Form["price"]);
                viewModel.ItemsInStockId = Convert.ToInt32(Request.Form["itemsInStockId"]);
                viewModel.ItemsInStock = Convert.ToInt32(Request.Form["itemsInStock"]);
                VehiclesForSale model = new VehiclesForSale
                {
                    Id = viewModel.Id,
                    VehicleMake = viewModel.VehicleMake,
                    VehicleModel = viewModel.VehicleModel,
                    VehiclePicture = viewModel.VehiclePicture,
                    Price = viewModel.Price
                };

                if (file.Length > 0)
                {
                   
                    ItemsInStockModel stockModel = new ItemsInStockModel();
                    stockModel.ItemsInStock = viewModel.ItemsInStock;
                    stockModel.VehiclesForSaleId = viewModel.ItemsInStockId;
                    stockModel.Id = viewModel.Id;
                    using (var memoryStream = new MemoryStream())
                    {
                        await file.CopyToAsync(memoryStream);
                        model.VehiclePicture = memoryStream.ToArray();
                    }
                    try
                    {
                        await VehiclesForSaleService.UpdateAsync(model);
                    }
                    catch(Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
                    await ItemsInStockService.UpdateAsync(stockModel);
                }
                return new ObjectResult(HttpStatusCode.Accepted);


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [Authorize(Roles ="Admin")]
        [HttpDelete]
        [Route("api/VehiclesForSaleAPI/{Id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {

                await VehiclesForSaleService.DeleteAsync(id);
                return Ok();

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("api/VehiclesForSaleAPI/UpdateItemsInStock")]
        public async Task<IActionResult> UpdateItemsInStock([FromBody]ItemsInStockModel model)
        {
            try
            {

                await ItemsInStockService.UpdateAsync(model);
                return Ok();

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
