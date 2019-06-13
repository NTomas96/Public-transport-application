using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class Line
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public LineType LineType { get; set; }
        [NotMapped]
        public List<GeoLocation> Waypoints
        {
            get
            {
                if (WaypointsInternal == null) WaypointsInternal = "";

                List<GeoLocation> list = new List<GeoLocation>();
                string[] coords = WaypointsInternal.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries);

                foreach(var coord in coords)
                {
                    double[] points = Array.ConvertAll(coord.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries), Double.Parse);
                    GeoLocation loc = new GeoLocation();
                    loc.Lat = points[0];
                    loc.Lon = points[1];
                    list.Add(loc);
                }

                return list;
            }
            set
            {
                WaypointsInternal = String.Join(";", value.Select(p => p.Lat + "," + p.Lon).ToArray());
            }
        }

        [JsonIgnore]
        public string WaypointsInternal { get; set; }
        public List<Station> Stations { get; set; }
    }
}