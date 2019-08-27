using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Results;
using System.Text;
using System.Net.Http;
using System.Threading.Tasks;
using System.Threading;

namespace Backend.Util
{
    public class ErrorApiResult<T> : ApiResult<T>
    {
        public ErrorApiResult(T result, HttpRequestMessage request) : base(result, request)
        {
            
        }

        public override Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            var result = base.ExecuteAsync(cancellationToken);
            result.Result.StatusCode = System.Net.HttpStatusCode.BadRequest;
            return result;
        }
    }
}