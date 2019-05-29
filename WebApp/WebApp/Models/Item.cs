using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Item
    {
        public int Id { get; set; }
        public Ticket Ticket { get; set; }
        public double Price { get; set; }
    }
}