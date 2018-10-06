using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Project.Service.Common;
using Project.DAL.Models;
using Project.WebAPI.ViewModels;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Security.Cryptography;

namespace Project.WebAPI.Controllers
{
    [Authorize]
    [Produces("application/json")]
    public class AccountsAPIController : Controller
    {
        private IUserDetailsService UserService;
        private readonly AppSettings AppSettings;

        public AccountsAPIController(
            IUserDetailsService userService,
            IOptions<AppSettings> appSettings)
        {
            UserService = userService;
            AppSettings = appSettings.Value;
        }
        
        [AllowAnonymous]
        [HttpPost]
        [Route("api/AccountsAPI/Login")]
        public async Task<IActionResult> Login([FromBody]UserDetailsViewModel model)
        {
            var user = await UserService.Authenticate(model.Username, model.Password);

            if (user == null)
                return Unauthorized();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(AppSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(5),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            var tokenModel = new
            {
                Id = user.Id,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = tokenString
            };
            return Ok(tokenModel);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/AccountsAPI/Register")]
        public async Task<IActionResult> Register([FromBody]UserDetailsViewModel model)
        {


            try
            {
                var hmac = new HMACSHA512();
                var user = new UserDetails
                {
                    Id = model.Id,
                    Username = model.Username,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(model.Password))
                };
                await UserService.InsertAsync(user, model.Password);
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await UserService.GetAllAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await UserService.GetByIdAsync(id);
            return Ok(user);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody]UserDetailsViewModel model)
        {

            try
            {
                var hmac = new HMACSHA512();
                var user = new UserDetails
                {
                    Id = model.Id,
                    Username = model.Username,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(model.Password))
                };
                await UserService.UpdateAsync(user, model.Password);
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await UserService.DeleteAsync(id);
            return Ok();
        }

        
    }
}

