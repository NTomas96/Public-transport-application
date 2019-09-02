using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Backend.Models;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace Backend.Hubs
{
    [HubName("Bus")]
    public class BusHub : Hub
    {

        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<BusHub>();

        public void Hello()
        {
            Clients.All.hello();
        }

        public static void SayHello(Vehicle vehicle)
        {
            hubContext.Clients.All.hello(vehicle);
        }
    }
}