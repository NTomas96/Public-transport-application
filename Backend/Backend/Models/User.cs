using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Toolbelt.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Index(IsUnique = true)]
        [Column(TypeName = "VARCHAR(100)")]
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime DayOfBirth { get; set; }
        public string Address { get; set; }
        public PassengerType PassengerType { get; set; }
        public string AdditionalInfo { get; set; }
        public UserType UserType { get; set; }
        public bool Active { get; set; }
        public VerificationStatus VerificationStatus { get; set; }


        public bool checkUserProperties()
        {
            if (String.IsNullOrEmpty(FirstName) || String.IsNullOrWhiteSpace(FirstName))
                return false;

            if (String.IsNullOrEmpty(LastName) || String.IsNullOrWhiteSpace(LastName))
                return false;

            if (String.IsNullOrEmpty(Email) || String.IsNullOrWhiteSpace(Email))
            { return false; }
            else
            {
                int indexET = Email.LastIndexOf('@');
                int indexDOT = Email.LastIndexOf('.');

                if (indexET < 0 || indexDOT < 0)
                {
                    return false;
                }
                else if (indexET > indexDOT)
                {
                    return false;
                }
            }

            if (String.IsNullOrEmpty(Password) || String.IsNullOrWhiteSpace(Password))
                return false;

            DateTime d = new DateTime(1, 1, 1, 12, 0, 0, 0);
            var res = DateTime.Compare(DayOfBirth, d);

            if (DayOfBirth == null || res <= 0)
                return false;

            if (String.IsNullOrEmpty(Address) || String.IsNullOrWhiteSpace(Address))
                return false;

            return true;
        }


    }
}
