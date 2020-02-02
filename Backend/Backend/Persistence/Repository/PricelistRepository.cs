using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Persistence.Repository
{
    public class PricelistRepository : Repository<Pricelist,int>, IPricelistRepository
    {
        protected AppDbContext appDbContext { get { return context as AppDbContext; } }

        public PricelistRepository(DbContext context) : base(context)
        {

        }

        public Pricelist GetTicketPrice(TicketType ticketType, PassengerType passengerType)
        {
            return appDbContext.Pricelists.Where(pricelist => pricelist.TicketType == ticketType && pricelist.PassengerType == passengerType).FirstOrDefault();
        }
    }
}