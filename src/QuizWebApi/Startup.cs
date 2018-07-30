using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Couchbase.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.PlatformAbstractions;
using MongoDB.Driver;
using Swashbuckle.AspNetCore.Swagger;
using SwashbuckleAspNetVersioningShim;

namespace QuizWebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        /// <summary>
        /// Configures the services.
        /// </summary>
        /// <param name="services">The services.</param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
                options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
            });
            services.AddMvcCore().AddVersionedApiExplorer();

            // reporting api versions will return the headers "api-supported-versions" and "api-deprecated-versions"
            services.AddApiVersioning(o =>
            {
                o.ReportApiVersions = true;
                o.AssumeDefaultVersionWhenUnspecified = true;
                o.DefaultApiVersion = new ApiVersion(1, 0);
            });
            // Add swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "Quiz API",
                    Description = "Quiz details",
                    TermsOfService = "None",
                    Contact = new Contact { Name = "Quiz Team", Email = "", Url = "https://not-available-for-now.net" },
                    License = new License { Name = "Proprietary", Url = "" }
                });

                // Pull xml comments from controller actions to show on swagger ui
                // The WebApi.xml creation is in the csproj file directly
                var basePath = PlatformServices.Default.Application.ApplicationBasePath;
                var xmlPath = Path.Combine(basePath, "QuizWebApi.xml");
                c.IncludeXmlComments(xmlPath);

                // for asp.net api versioning shim
                var provider = services.BuildServiceProvider().GetRequiredService<IApiVersionDescriptionProvider>();
                c.ConfigureSwaggerVersions(provider, "Quiz Service");
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            //var mongoClient = new MongoClient("mongodb://localhost:27017");
            //mongoClient.GetDatabase("QuizDB");
           // services.AddSingleton<IMongoDatabase>(MongodbClient.GetMongoDatabase());
            services.AddCouchbase(Configuration.GetSection("Couchbase"));
            services.AddCouchbaseBucket<IQuizBucketProvider>("Quiz", "quiz@123");
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder => builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// <summary>
        /// Configures the specified application.
        /// </summary>
        /// <param name="app">The application.</param>
        /// <param name="env">The env.</param>
        /// <param name="provider">The provider.</param>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IApiVersionDescriptionProvider provider, IApplicationLifetime applicationLifetime)
        {
            app.UseCors("CorsPolicy");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            CouchbaseHelper.Initialize(app.ApplicationServices.GetRequiredService<IQuizBucketProvider>().GetBucket());
            app.UseHttpsRedirection();
            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                // from asp.net api versioning shim
                c.ConfigureSwaggerVersions(provider, new SwaggerVersionOptions
                {
                    DescriptionTemplate = "Version {0} docs",
                    RouteTemplate = "/swagger/{0}/swagger.json"
                });
            });

            applicationLifetime.ApplicationStopped.Register(() =>
            {
                app.ApplicationServices.GetRequiredService<ICouchbaseLifetimeService>().Close();
            });
        }
    }
}
