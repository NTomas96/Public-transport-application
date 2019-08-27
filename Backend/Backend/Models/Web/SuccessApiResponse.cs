using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Models.Web
{
    public class SuccessApiResponse : ApiResponse
    {
        public object Value { get; set; }

        public SuccessApiResponse(object value)
        {
            this.Success = true;
            this.Value = value;
        }
    }
}