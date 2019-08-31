using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPositionService
{
    public class Waypoint
    {
        public double Lat { get; set; }
        public double Lon { get; set; }

        public override bool Equals(object obj)
        {
            Waypoint x = (Waypoint)obj;
            return x.Lat == this.Lat && x.Lon == this.Lon ;
        }

        public override string ToString()
        {
            return "Lat: " + Lat + ", Lon: " + Lon;
        }
    }
}
