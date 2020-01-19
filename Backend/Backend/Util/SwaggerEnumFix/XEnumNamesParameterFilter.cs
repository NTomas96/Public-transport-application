using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Util.SwaggerEnumFix
{
    public class XEnumNamesParameterFilter : IParameterFilter
    {
        public void Apply(OpenApiParameter parameter, ParameterFilterContext context)
        {
            var typeInfo = context.ParameterInfo.ParameterType;
            if (typeInfo.IsEnum)
            {
                var names = Enum.GetNames(context.ParameterInfo.ParameterType).Select(name => new OpenApiString(name));

                var arr = new OpenApiArray();

                arr.AddRange(names);
                parameter.Extensions.Add("x-enumNames", arr);
            }
            else if (typeInfo.IsGenericType && !parameter.Extensions.ContainsKey("x-enumNames"))
            {
                foreach (var genericArgumentType in typeInfo.GetGenericArguments())
                {
                    if (genericArgumentType.IsEnum && !parameter.Extensions.ContainsKey("x-enumNames"))
                    {
                        var names = Enum.GetNames(genericArgumentType).Select(name => new OpenApiString(name));

                        var arr = new OpenApiArray();

                        arr.AddRange(names);
                        parameter.Extensions.Add("x-enumNames", arr);
                    }
                }
            }
        }
    }
}
