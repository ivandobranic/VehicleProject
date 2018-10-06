
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SD.LLBLGen.Pro.ORMSupportClasses;
using SD.LLBLGen.Pro.DQE.SqlServer;
using System.Diagnostics;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Project.WebAPI;


namespace WebApplication1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc();
            
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.RegisterModule(new AutofacModule());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            RuntimeConfiguration.AddConnectionString("ConnectionString.SQL Server (SqlClient)", @"data source=DESKTOP-K7BKMEJ\SQLEXPRESS;initial catalog=Vehicle;integrated security=SSPI;persist security info=False;packet size=4096");
            RuntimeConfiguration.ConfigureDQE<SQLServerDQEConfiguration>(
                                c => c.SetTraceLevel(TraceLevel.Verbose)
                                        .AddDbProviderFactory(typeof(System.Data.SqlClient.SqlClientFactory))
                                        .SetDefaultCompatibilityLevel(SqlServerCompatibilityLevel.SqlServer2012));

            RuntimeConfiguration.Tracing
                        .SetTraceLevel("ORMPersistenceExecution", TraceLevel.Info);
            RuntimeConfiguration.Entity
                        .SetMarkSavedEntitiesAsFetched(true);

            app.UseCors(options => options.WithOrigins().AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=VehicleMake}/{action=Index}/{id?}");
            });
        }
    }
}
