using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class Timetable
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public Line Line { get; set; }

        [NotMapped]
        public List<long> Departures
        {
            get
            {
                return Array.ConvertAll(DeparturesInternal.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries), long.Parse).ToList();
            }
            set
            {
                DeparturesInternal = String.Join(";", value.Select(p => p.ToString()).ToArray());
            }
        }

        [JsonIgnore]
        public string DeparturesInternal { get; set; }

    }
}