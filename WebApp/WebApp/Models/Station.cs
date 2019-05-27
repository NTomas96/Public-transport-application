using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Station
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public GeoCords GeographicCordinates { get; set; }

        public List<Line> Lines { get; set; }
    }
}