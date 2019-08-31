using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPositionService
{
    public class BusJson
    {
        public string TrackerSerial { get; set; }
        public Waypoint GeoLocation { get; set; }

        public BusJson(string TS, Waypoint GL)
        {
            TrackerSerial = TS;
            GeoLocation = new Waypoint() { Lat=GL.Lat, Lon=GL.Lon };
        }
    }
}
