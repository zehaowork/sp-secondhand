using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SpSecondHandApi.Interfaces;
using SpSecondHandApi.Services;
using SpSecondHandDb;
using SpSecondHandDb.Interfaces;
using SpSecondHandDb.Repositories;

namespace SpSecondHandApi
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
            services.AddCors(options => options.AddPolicy("SpPolicy", builder =>
            {
                builder.SetIsOriginAllowed(o => o.Contains("localhost") || o.Contains("smallpotatoestech"))
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            }));

            services
                .AddControllers()
                .AddJsonOptions(options =>
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

            services.AddSwaggerGen();
            services.AddHttpClient();
            services.AddMemoryCache();
            services.AddHttpContextAccessor();
            services.AddAutoMapper(typeof(Startup));

            AddDbServices(services);
            AddControllerServices(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddFile("Logs/splog-{Date}.txt");

            using (var scope = app.ApplicationServices.CreateScope())
            using (var context = scope.ServiceProvider.GetService<SpShDbContext>())
                context.Database.Migrate();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors("SpPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
        }

        #region Private

        private void AddDbServices(IServiceCollection services)
        {
            services.AddDbContext<SpShDbContext>(options => options
                .UseLazyLoadingProxies()
                .UseSqlServer(Configuration["ConnectionString"])
            );
            services.AddScoped<ISecondHandRepository, SecondHandRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserContactRepository, UserContactRepository>();
            services.AddScoped<IStaticDataRepository, StaticDataRepository>();
        }

        private void AddControllerServices(IServiceCollection services)
        {
            services.AddScoped<ISecondHandService, SecondHandService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IStaticDataServices, StaticDataService>();
        }

        #endregion
    }
}
