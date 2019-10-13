using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Web
{
    public class ErrorApiResponse : ApiResponse
    {
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }

        public ErrorApiResponse(int errorCode, string errorMessage)
        {
            this.Success = false;
            this.ErrorCode = errorCode;
            this.ErrorMessage = errorMessage;
        }
    }
}
