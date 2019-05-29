using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public TicketType TicketType{ get; set; }
        public ApplicationUser TicketUser { get; set; }
    }
}