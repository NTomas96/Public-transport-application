using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Util.SwaggerEnumFix
{
    public static class SwaggerGenOptionsExtensions
    {
        public static void AddEnumsWithValuesFixFilters(this SwaggerGenOptions swaggerGenOptions)
        {
            swaggerGenOptions.SchemaFilter<XEnumNamesSchemaFilter>();
            swaggerGenOptions.ParameterFilter<XEnumNamesParameterFilter>();
            swaggerGenOptions.OperationFilter<OperationIdFix>();
        }
    }
}
