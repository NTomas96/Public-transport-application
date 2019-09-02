using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Models.Web
{
    public class BusJson
    {
        public string TrackerSerial { get; set; }
        public GeoLocation GeoLocation { get; set; }
    }
}