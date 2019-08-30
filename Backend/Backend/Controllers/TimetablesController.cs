using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApp.Persistence.UnitOfWork;

namespace Backend.Controllers
{
    public class TimetablesController : BetterApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public TimetablesController(IUnitOfWork u)
        {
            this.unitOfWork = u;
        }

        [Route("api/Timetables/{line}")]
        public IHttpActionResult Get(int line, DateTime date)
        {
            Line lineObj = this.unitOfWork.Lines.Get(line);

            if(lineObj != null)
            {
                Timetable table = unitOfWork.Timetables.GetTimetable(lineObj.Id, date.DayOfWeek);

                if(table != null)
                {
                    return JsonResult(table);
                }
                else
                {
                    return ErrorResult(4001, "Time table not found.");
                }
            }
            else
            {
                return ErrorResult(4001, "Line not found.");
            }
        }
    }
}
