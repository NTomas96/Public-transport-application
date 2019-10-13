using Backend.Models;
using Backend.Models.Web;
using Backend.Persistence.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class TimetablesController : ApiController
    {
        
        private readonly IUnitOfWork unitOfWork;

        public TimetablesController(IUnitOfWork u)
        {
            this.unitOfWork = u;
        }

        [HttpGet("{line}")]
        [ProducesResponseType(200, Type = typeof(Timetable))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult GetTimetable(int line, [FromQuery] DateTime date)
        {
            Line lineObj = this.unitOfWork.Lines.Get(line);

            if(lineObj != null)
            {
                Timetable table = unitOfWork.Timetables.GetTimetable(lineObj.Id, date.DayOfWeek);

                if(table != null)
                {
                    return Success(table);
                }
                else
                {
                    return Error(4001, "Time table not found.");
                }
            }
            else
            {
                return Error(4001, "Line not found.");
            }
        }
    }
}
