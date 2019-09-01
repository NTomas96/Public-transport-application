using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Models.Web
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public UserType UserType { get; set; }
    }
}