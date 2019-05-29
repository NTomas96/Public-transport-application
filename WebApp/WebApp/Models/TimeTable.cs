using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class TimeTable
    {
        public int Id { get; set; }
        public RideType RideType { get; set; }
        public DayOfWeek Day { get; set; }
        public DateTime Departure { get; set; }
        public Line Line { get; set; }
    }
}