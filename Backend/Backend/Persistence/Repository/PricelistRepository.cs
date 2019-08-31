using Backend.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Persistence.Repository;

namespace Backend.Persistence.Repository
{
    public class PricelistRepository : Repository<Timetable,int>, IPricelistRepository
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