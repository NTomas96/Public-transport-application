using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class Station
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public GeoLocation GeoLocation { get; set; }
        public List<Line> Lines { get; set; }
    }
}