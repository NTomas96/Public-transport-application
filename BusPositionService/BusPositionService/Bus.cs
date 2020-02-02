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
            double speed = 40.0 / 3600.0; // km/s

            double deltaDist = CalculateDistanceBetweenPoints(w1, w2) / 1000;

            return 2 * speed / deltaDist;
        }

        private double CalculateDistanceBetweenPoints(Waypoint w1, Waypoint w2)
        {
            var R = 6371e3; // metres
            var φ1 = DegreesToRadians(w1.Lat);
            var φ2 = DegreesToRadians(w2.Lat);
            var Δφ = DegreesToRadians(w2.Lat - w1.Lat);
            var Δλ = DegreesToRadians(w2.Lon - w1.Lon);

            var a = Math.Sin(Δφ/2) * Math.Sin(Δφ/2) +
                Math.Cos(φ1) * Math.Cos(φ2) *
                Math.Sin(Δλ/2) * Math.Sin(Δλ/2);
            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1-a));

            return R * c;
        }

        public void calculateBusLocation(List<Waypoint> lineWaypoints,bool lineRoute)
        {
            //[lat1 + (lat2 - lat1) * per, long1 + (long2 - long1) * per]

            Waypoint[] waypoints = lineWaypoints.ToArray();
            int waypointsCount = waypoints.Count();

            if (Index == -1)
            {
                Index++;
            }
            else
            {
                //current bus coords
                double lat1 = waypoints[Index].Lat;
                double lon1 = waypoints[Index].Lon;
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

                double perc = calculatePerc(new Waypoint() { Lat = lat1, Lon = lon1 }, new Waypoint() { Lat = lat2, Lon = lon2 });
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
                    var loc = CalculatePointBetweenPoints(lat1, lon1, lat2, lon2, RoutePerc);

                    BusLocation.Lat = loc.Item1;
                    BusLocation.Lon = loc.Item2;
                }                
            }
        }

        
        private Tuple<double, double> CalculatePointBetweenPoints(double lat1, double lon1, double lat2, double lon2, double percent)
        {
            double lat = lat1 + (lat2 - lat1) * percent;
            double lon = lon1 + (lon2 - lon1) * percent;

            return new Tuple<double, double>(lat, lon);
        }
        
        private double DegreesToRadians(double deg)
        {
            return deg * Math.PI / 180;
        }

        private double RadiansToDegrees(double rad)
        {
            return rad * 180 / Math.PI;
        }

        /*
        // Original calculation from https://www.movable-type.co.uk/scripts/latlong.html
        private Tuple<double, double> CalculatePointBetweenPoints(double lat1deg, double lon1deg, double lat2deg, double lon2deg, double percent)
        {
            double lat1 = DegreesToRadians(lat1deg);
            double lng1 = DegreesToRadians(lon1deg);
            double lat2 = DegreesToRadians(lat2deg);
            double lng2 = DegreesToRadians(lon2deg);

            double deltaLat = lat2 - lat1;
            double deltaLng = lng2 - lng1;

            //const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
            //const δ = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            double calcA = Math.Sin(deltaLat / 2) * Math.Sin(deltaLat / 2) +
                Math.Cos(lat1) * Math.Cos(lat2) * Math.Sin(deltaLng / 2) * Math.Sin(deltaLng / 2);
            double calcB = 2 * Math.Atan2(Math.Sqrt(calcA), Math.Sqrt(1 - calcA));

            //const A = Math.sin((1-fraction)*δ) / Math.sin(δ);
            //const B = Math.sin(fraction*δ) / Math.sin(δ);
            double A = Math.Sin((1 - percent) * calcB) / Math.Sin(calcB);
            double B = Math.Sin(percent * calcB) / Math.Sin(calcB);

            //const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
            //const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
            //const z = A * Math.sin(φ1) + B * Math.sin(φ2);
            double x = A * Math.Cos(lat1) * Math.Cos(lng1) + B * Math.Cos(lat2) * Math.Cos(lng2);
            double y = A * Math.Cos(lat1) * Math.Sin(lng1) + B * Math.Cos(lat2) * Math.Sin(lng2);
            double z = A * Math.Sin(lat1) + B * Math.Sin(lat2);

            //const φ3 = Math.atan2(z, Math.sqrt(x*x + y*y));
            //const λ3 = Math.atan2(y, x);
            double lat3 = Math.Atan2(z, Math.Sqrt(x * x + y * y));
            double lng3 = Math.Atan2(y, x);

            //const lat = φ3.toDegrees();
            //const lon = λ3.toDegrees();
            return new Tuple<double, double>(RadiansToDegrees(lat3), RadiansToDegrees(lng3));
        }
        */
    }
}
