using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPositionService
{
    public class Bus
    {
        public string TrackerSerial{ get; set; }
        public Waypoint BusLocation { get; set; }
        public int Index { get; set; } // index of starting waypoint
        public bool Heading { get; set; } //true=forward , false=backward
        public double RoutePerc { get; set; } //       

        public Bus()
        {
            Index = -1;
            BusLocation = new Waypoint() { Lat=0, Lon=0 };
            Heading = true;
            RoutePerc = 0;
        }

        private double calculatePerc(Waypoint w1, Waypoint w2)
        {
            double kmInDegree = 110.562;
            double speed = 40.0 / 3600.0; // km/s

            //coords
            double lat1 = BusLocation.Lat;
            double lon1 = BusLocation.Lon;
            double lat2 = w2.Lat;
            double lon2 = w2.Lon;

            double deltaLat = (lat2 - lat1) * kmInDegree;
            double deltaLon = (lon2 - lon1) * kmInDegree;

            double deltaDist = Math.Sqrt((deltaLat * deltaLat) + (deltaLon * deltaLon)); // distance in km

            return speed / deltaDist;
        }

        public void calculateBusLocation(List<Waypoint> lineWaypoints,bool lineRoute)
        {
            //[lat1 + (lat2 - lat1) * per, long1 + (long2 - long1) * per]

            Waypoint[] waypoints = lineWaypoints.ToArray();
            int waypointsCount = waypoints.Count();

            //current bus coords
            double lat1 = BusLocation.Lat;
            double lon1 = BusLocation.Lon;

            if (Index == -1)
            {
                Index++;
            }
            else
            {
                double lat2;
                double lon2;

                if (lineRoute)
                {
                    //circular rout
                    if (Index == waypointsCount - 1) // last == first element
                    {
                        Index = 0;
                    }
                }
                else
                {
                    //oneway
                    if (Index == waypointsCount - 1) //go back
                    {
                        Heading = false;
                    }

                    if (Index == 0 && Heading != true) //go folward
                    {
                        Heading = true;
                    }
                }

                if(lineRoute || Heading)
                {
                    lat2 = waypoints[Index + 1].Lat;
                    lon2 = waypoints[Index + 1].Lon;
                }
                else
                {
                    lat2 = waypoints[Index - 1].Lat;
                    lon2 = waypoints[Index - 1].Lon;
                }

                double perc = calculatePerc(BusLocation, new Waypoint() { Lat = lat2, Lon = lon2 });
                RoutePerc += perc;

                if (RoutePerc >= 1)
                {
                    if (lineRoute || Heading)
                    {
                        Index++;
                    }
                    else
                    {
                        Index--;
                    }
                    BusLocation.Lat = waypoints[Index].Lat;
                    BusLocation.Lon = waypoints[Index].Lon;
                    RoutePerc = 0;
                }
                else
                {
                    BusLocation.Lat = lat1 + (lat2 - lat1) * perc;
                    BusLocation.Lon = lon1 + (lon2 - lon1) * perc;
                }                
            }
        }
    }
}
