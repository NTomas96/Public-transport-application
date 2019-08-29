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

        // GET: api/Timetables
        public IHttpActionResult GetTimetables()
        {
			/*
            List<Timetable> timetables = new List<Timetable>();
            int timespan = 600;
            int lineid = 2;
            
            DayOfWeek day = DayOfWeek.Sunday;
            
            do
            {
                while(lineid!=7)
                {
                    Timetable tt = new Timetable();
                    tt.DayOfWeek = day;
                    tt.Line = unitOfWork.Lines.Get(lineid);

                    var list = new List<long>();

                    for (int i = 0; i < 68; i++)
                    {
                        list.Add(25200 + i * timespan);
                    }

                    tt.Departures = list;
                    
                    timetables.Add(tt);
                    lineid++;
                }
                Timetable tt1 = new Timetable();
                tt1.DayOfWeek = DayOfWeek.Saturday;
                tt1.Line = unitOfWork.Lines.Get(lineid);

                var list1 = new List<long>();

                for (int i = 0; i < 68; i++)
                {
                    list1.Add(25200 + i * timespan);
                }

                tt1.Departures = list1;

                timetables.Add(tt1);
                    lineid = 1;
                    day++;
                    timespan += 150;
            } while (day != DayOfWeek.Saturday);


            unitOfWork.Timetables.AddRange(timetables.AsEnumerable());
            unitOfWork.Complete();

            return null;*/
            return JsonResult(unitOfWork.Timetables.GetTimetables());
        }
    }
}
