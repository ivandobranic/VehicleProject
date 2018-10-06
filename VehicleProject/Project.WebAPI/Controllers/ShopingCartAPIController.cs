using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.DAL.Models;
using Project.Service.Common;
using Project.WebAPI.ViewModels;

namespace Project.Web.API.Contollers
{
    [Produces("application/json")]
    //[Authorize]
    public class ShoppingCartAPIController : Controller
    {
        private IShoppingCartService ShoppingCartService;
        private IStockService ItemsInStockService;
        private IMailSender MailSender;
        private IFileWriterService FileWriterService;

        public ShoppingCartAPIController(IShoppingCartService shoppingCartService, IStockService itemsInStockService,
            IMailSender mailSender, IFileWriterService fileWriterService)
        {
            this.ShoppingCartService = shoppingCartService;
            this.ItemsInStockService = itemsInStockService;
            this.MailSender = mailSender;
            this.FileWriterService = fileWriterService;
        }
        [HttpGet]
        [Route("api/ShoppingCartAPI")]
        public async Task<IActionResult> Get(string userName)
        {
            try
            {
                var model = await ShoppingCartService.GetTotalItems(userName);
                return Ok(model);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/ShoppingCartAPI")]
        public async Task<IActionResult> Post([FromBody] Cart cart)
        {
            try
            {
                await ShoppingCartService.AddItemToCart(cart);
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("api/ShoppingCartAPI/{Id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await ShoppingCartService.RemoveItemFromCart(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
  
      
        [HttpPost]
        [Route("api/ShoppingCartAPI/PlaceOrder")]
        public async Task<IActionResult> PlaceOrder([FromBody] OrderDetails details)
        {
            try
            {
                await ShoppingCartService.PlaceOrder(details);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/ShoppingCartAPI/ItemsInStock")]
        public async Task<IActionResult> ItemsInStock()
        {
            try
            {
               var model = await ItemsInStockService.GetAllAsync();
                return Ok(model);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}