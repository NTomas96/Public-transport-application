using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class Line
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public LineType LineType { get; set; }
        public List<GeoLocation> Waypoints { get; set; }
        public List<Station> Stations { get; set; }
    }
}