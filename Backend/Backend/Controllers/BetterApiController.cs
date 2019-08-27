using Backend.Models.Web;
using Backend.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Backend.Controllers
{
    public class BetterApiController : ApiController
    {
        public IHttpActionResult ErrorResult(int errorCode, string errorMessage)
        {
            var result = new ErrorApiResponse(errorCode, errorMessage);

            return new ErrorApiResult<ErrorApiResponse>(result, this.Request);
        }

        public IHttpActionResult JsonResult(object value)
        {
            var result = new SuccessApiResponse(value);

            return new ApiResult<SuccessApiResponse>(result, this.Request);
        }
    }
}