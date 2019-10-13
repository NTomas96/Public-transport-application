using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Util
{
    public class AppSettings
    {
        public string JwtSecret { get; set; }
        public string DbConnection { get; set; }
    }
}
