using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPositionService
{
    public class LineObj
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public List<Waypoint> Waypoints { get; set; }
        public List<Bus> Buses { get; set; }
        public bool LineRoute { get; set; } // true = circular line | false = oneway route

        public LineObj()
        {
            Buses = new List<Bus>();
        }
    }
}
