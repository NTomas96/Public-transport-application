using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Util.SwaggerEnumFix
{
    public class XEnumNamesSchemaFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            var typeInfo = context.Type;
            if (typeInfo.IsEnum)
            {
                var names = Enum.GetNames(context.Type).Select(name => new OpenApiString(name));

                var arr = new OpenApiArray();

                arr.AddRange(names);
                schema.Extensions.Add("x-enumNames", arr);
            }
            else if (schema.Enum != null)
            {
                var names = schema.Enum.Select(n => new OpenApiString(n.ToString()));
                var arr = new OpenApiArray();

                arr.AddRange(names);
                schema.Extensions.Add("x-enumNames", arr);
            }
            else if (typeInfo.IsGenericType && !schema.Extensions.ContainsKey("x-enumNames"))
            {
                foreach (var genericArgumentType in typeInfo.GetGenericArguments())
                {
                    if (genericArgumentType.IsEnum)
                    {
                        var names = Enum.GetNames(genericArgumentType).Select(name => new OpenApiString(name));

                        var arr = new OpenApiArray();

                        arr.AddRange(names);

                        if (!schema.Extensions.ContainsKey("x-enumNames"))
                            schema.Extensions.Add("x-enumNames", arr);
                    }
                }
            }
        }
    }
}
