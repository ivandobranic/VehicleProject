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

namespace Project.WebAPI.Controllers
{
    
    [Produces("application/json")]
    //[Authorize]
    public class VehicleMakeAPIController : Controller
    {
        IVehicleMakeService VehicleMakeService;
        IFilter Filter;
        public VehicleMakeAPIController(IVehicleMakeService vehicleMakeService, IFilter filter)
        {
            this.VehicleMakeService = vehicleMakeService;
            this.Filter = filter;
        }

        [HttpGet]
        [Route("api/VehicleMakeAPI")]
        public async Task<IActionResult> Get(int? pageNumber = null, bool isAscending = false, string search = null)
        {
            try
            {

                Filter.PageNumber = pageNumber ?? 1;
                Filter.Search = search;
                Filter.IsAscending = isAscending;

                var pagedList = await VehicleMakeService.GetPagedList(Filter);

                var newModel = new
                {
                    Model = pagedList.ToList(),
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
        [Route("api/VehicleMakeAPI/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                  var vehicleMake = await VehicleMakeService.GetByIdAsync(id);
                    if (vehicleMake == null)
                    {
                        return NotFound();
                    }
                 
                
                return Ok(vehicleMake);
            }
            catch (Exception ex)
            {
               
                return BadRequest(ex.Message);
            }

        }

        [HttpPost]
        [Route("api/VehicleMakeAPI", Name = "VehicleMakeRoute")]
        public async Task<IActionResult> Post([FromBody]VehicleMake model)
        {
            try
            {
                await VehicleMakeService.CreateAsync(model);
                return CreatedAtRoute("VehicleMakeRoute", new { model.Id }, model);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpPut]
        [Route("api/VehicleMakeAPI")]
        public async Task<IActionResult> Put([FromBody] VehicleMake model)
        {
            try
            {

                if (model == null)
                {
                    return NotFound();

                }
                else
                {
                    
                    await VehicleMakeService.UpdateAsync(model);
                    return new ObjectResult(HttpStatusCode.Accepted);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete]
        [Route("api/VehicleMakeAPI/{Id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {

                await VehicleMakeService.DeleteAsync(id);
                return Ok();

            }
            catch (Exception ex)
            {
              
                return BadRequest(ex.Message);
            }
        }
    }
}
