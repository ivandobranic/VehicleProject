using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Project.DAL.Models;
using Project.Repository.Common;
using Project.Repository;
using Project.Service.Common;
using Project.Service;
using Microsoft.Extensions.Configuration;
using System;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Project.WebAPI
{
    public class Startup
    {
        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            
        }

        public IConfiguration Configuration { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
          
            services.AddMvc();
            services.AddCors();
            services.AddAuthentication();
            services.AddDbContext<VehicleContext>(options => options.UseSqlServer(Configuration.GetConnectionString("VehicleContext"),
            b => b.MigrationsAssembly("Project.DAL")).ConfigureWarnings(x => x.Ignore(RelationalEventId.AmbientTransactionWarning)));
            services.AddTransient<IRepository<VehicleMake>, GenericRepository<VehicleMake>>();
            services.AddTransient<IMakeRepository, VehicleMakeRepository>();
            services.AddTransient<IVehicleMakeService, VehicleMakeService>();
            services.AddTransient<IFilter, Filter>();
            services.AddTransient<IRepository<UserDetails>, GenericRepository<UserDetails>>();
            services.AddTransient<IUserDetailsRepository, UserDetailsRepository>();
            services.AddTransient<IUserDetailsService, UserDetailsService>();
            services.AddTransient<IRepository<VehiclesForSale>, GenericRepository<VehiclesForSale>>();
            services.AddTransient<IVehiclesForSaleRepository, VehiclesForSaleRepository>();
            services.AddTransient<IVehiclesForSaleService, VehiclesForSaleService>();
            services.AddTransient<ICartRepository, CartRepository>();
            services.AddTransient<IShoppingCartService, ShoppingCartService>();
            services.AddTransient<IPaymentRepository, PaymentRepository>();
            services.AddTransient<IStockRepository, ItemsInStockRepository>();
            services.AddTransient<IStockService, ItemsInStockservice>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IMailSender, MailSender>();
            services.AddTransient<IFileWriter, FileWriter>();
            services.AddTransient<IFileWriterService, FileWriterService>();
            services.AddTransient<ICardPaymentService, CardPaymentService>();
            
       

            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });


        }
      


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider serviceProvider)
        {
            
            app.UseCors(options => options.WithOrigins().AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin().AllowCredentials().WithHeaders());
            app.UseAuthentication();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseMvc(routes =>
          {
              routes.MapRoute(
                  name: "default",
                  template: "{controller=VehicleMakeAPI}/{action=Index}/{id?}");
          });

          
        }
    }
   
}
