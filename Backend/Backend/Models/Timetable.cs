using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class Timetable
    {
        public int Id { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public List<DateTime> Departures { get; set; }
        public List<Line> Lines { get; set; }
    }
}