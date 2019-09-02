using Microsoft.AspNet.SignalR;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Owin;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: OwinStartup(typeof(Backend.Startup))]
namespace Backend
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.MapSignalR("/signalr", new HubConfiguration());
        }
    }
}