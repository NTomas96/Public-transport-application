using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Util.SwaggerEnumFix
{
    public class OperationIdFix : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            string name = context.MethodInfo.Name;

            // to camel case
            name = Char.ToLowerInvariant(name[0]) + name.Substring(1);

            operation.Extensions.Add("x-operation-name", new OpenApiString(name));
        }
    }
}
