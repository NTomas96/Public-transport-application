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
        [Index("Timetable_1", 1, IsUnique = true)]
        public DayOfWeek DayOfWeek { get; set; }
        [Index("Timetable_1", 2, IsUnique = true)]
        public Line Line { get; set; }
        public List<long> Departures { get; set; }
       
    }
}