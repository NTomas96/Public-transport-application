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
        // TODO: use camelCase
        // public ApiResult(T result, HttpRequestMessage request) : base(result, new JsonSerializerSettings() { ContractResolver = new CamelCasePropertyNamesContractResolver() }, Encoding.UTF8, request)
        public ApiResult(T result, HttpRequestMessage request) : base(result, new JsonSerializerSettings(), Encoding.UTF8, request)
        {

        }
    }
}