using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class StationLine
    {
        public int LineId { get; set; }
        public int StationId { get; set; }
        [JsonIgnore]
        public Line Line { get; set; }
        public Station Station { get; set; }
    }
}
