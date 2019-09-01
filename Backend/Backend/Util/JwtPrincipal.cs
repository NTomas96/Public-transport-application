using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;

namespace Backend.Util
{
    public class JwtPrincipal : GenericPrincipal
    {
        public int UserId { get; set; }
        public UserType UserType { get; set; }

        public JwtPrincipal(int userId, UserType userType) : base(new GenericIdentity("" + userId, "Jwt"), new string[] { userType.ToString() })
        {
            UserId = userId;
            UserType = userType;
        }
    }
}