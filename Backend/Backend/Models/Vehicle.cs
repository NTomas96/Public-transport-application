using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class Vehicle : GeoLocation
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        [Index(IsUnique = true)]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string TrackerSerial { get; set; }
        public Line Line { get; set; }
    }
}