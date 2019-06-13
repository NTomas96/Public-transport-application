using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class Pricelist
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Index("Pricelist_1", 1, IsUnique = true)]
        public TicketType TicketType { get; set; }
        [Index("Pricelist_1", 2, IsUnique = true)]
        public PassengerType PassengerType { get; set; }
        public double Price { get; set; }
    }
}