using Backend.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Persistence.Repository;

namespace Backend.Persistence.Repository
{
    public class TimetableRepository : Repository<Timetable,int>, ITimetableRepository
    {
        protected AppDbContext appDbContext { get { return context as AppDbContext; } }

        public TimetableRepository(DbContext context) : base(context)
        {

        }

        public IQueryable<Timetable> GetTimetables()
        {
            return appDbContext.Timetables;
        }
    }
}