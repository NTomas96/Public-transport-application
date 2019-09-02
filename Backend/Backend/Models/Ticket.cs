using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class Ticket
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Index(IsUnique = true)]
        [Column(TypeName = "VARCHAR")]
        [StringLength(15)]
        public string TicketNumber { get; set; }
        public User User { get; set; }
        public TicketType TicketType { get; set; }
        public DateTime TimeBought { get; set; }
        [Index(IsUnique = true)]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string PayPalOrderId { get; set; }
        public string PayPalData { get; set; }

        public bool IsValid()
        {
            if(TicketType == TicketType.TimeTicket)
            {
                if(DateTime.Compare(DateTime.Now, TimeBought.Add(TimeSpan.FromMinutes(60))) > 0)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            else if(TicketType == TicketType.YearlyTicket)
            {
                return (DateTime.Now.Year == TimeBought.Year);
            }
            else if (TicketType == TicketType.MonthlyTicket)
            {
                return (DateTime.Now.Year == TimeBought.Year && DateTime.Now.Month == TimeBought.Month);
            }
            else if (TicketType == TicketType.DailyTicket)
            {
                return (DateTime.Now.Year == TimeBought.Year && DateTime.Now.Month == TimeBought.Month && DateTime.Now.Day == TimeBought.Day);
            }
            else
            {
                return false;
            }
        }
    }
}