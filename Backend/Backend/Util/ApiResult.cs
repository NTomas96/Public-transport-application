using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Results;
using System.Text;
using System.Net.Http;

namespace Backend.Util
{
    public class ApiResult<T> : JsonResult<T>
    {
        public ApiResult(T result, HttpRequestMessage request) : base(result, new JsonSerializerSettings(), Encoding.UTF8, request)
        {

        }
    }
}