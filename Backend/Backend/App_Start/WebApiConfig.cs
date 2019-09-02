using Backend.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using Unity;

namespace Backend
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            var container = new UnityContainer();
            container.EnableDebugDiagnostic(); // TODO: remove this
            var resolver = new UnityResolver(container);
            resolver.RegisterTypes();
            config.DependencyResolver = resolver;
            //config.EnableCors(new EnableCorsAttribute("*", "*", "*"));

            //GlobalHost.DependencyResolver = new SignalRUnityDependencyResolver(container);

            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
