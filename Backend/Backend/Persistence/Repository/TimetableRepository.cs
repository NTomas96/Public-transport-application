using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Persistence.Repository
{
    public class TimetableRepository : Repository<Timetable,int>, ITimetableRepository
    {
        protected AppDbContext appDbContext { get { return context as AppDbContext; } }

        public TimetableRepository(DbContext context) : base(context)
        {

        }

        public Timetable GetTimetable(int lineId, DayOfWeek dayOfWeek)
        {
            return appDbContext.Timetables.Where(timetable => timetable.DayOfWeek == dayOfWeek && timetable.Line.Id == lineId).FirstOrDefault();
        }

        public IQueryable<Timetable> GetTimetables()
        {
            return appDbContext.Timetables;
        }
    }
}