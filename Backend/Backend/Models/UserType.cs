using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public enum UserType
    {
        Unregistered=0,
        Passager=1,
        Controlor=2,
        Admin=4
    }
}