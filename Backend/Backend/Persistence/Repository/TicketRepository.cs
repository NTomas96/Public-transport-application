using Backend.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Persistence.Repository;

namespace Backend.Persistence.Repository
{
    public class TicketRepository : Repository<Ticket,int>, ITicketRepository
    {
        protected AppDbContext appDbContext { get { return context as AppDbContext; } }

        public TicketRepository(DbContext context) : base(context)
        {

        }

        public Ticket GetTicketBySerial(string serial)
        {
            return appDbContext.Tickets.Where(ticket => serial.Equals(ticket.TicketNumber)).FirstOrDefault();
        }
    }
}