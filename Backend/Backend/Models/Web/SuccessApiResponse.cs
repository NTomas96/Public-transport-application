using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Web
{
    public class SuccessApiResponse<T> : ApiResponse
    {
        public T Value { get; set; }

        public SuccessApiResponse(T value)
        {
            this.Success = true;
            this.Value = value;
        }
    }
}
