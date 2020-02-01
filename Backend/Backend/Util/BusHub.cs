using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Util
{
    public class BusHub : Hub
    {
        public void SayHello(string message)
        {
            Clients.All.SendAsync("SayHello", message);
        }
    }
}
