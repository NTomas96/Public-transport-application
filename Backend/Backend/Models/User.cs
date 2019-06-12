using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime DayOfBirth { get; set; }
        public string Address { get; set; }
        public PassigerType PassagerType { get; set; }
        public string AdditionalInfo { get; set; }
        public UserType UserType { get; set; }
    }
}