using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Persistence.Repository
{
    public interface IPricelistRepository : IRepository<Pricelist, int>
    {
        Pricelist GetTicketPrice(TicketType ticketType, PassengerType passengerType);
    }
}
