using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class RideSchedule
    {
        public string Day { get; set; }
        public List<DateTime> Departure { get; set; }
        public Line Line { get; set; }
    }
    
}