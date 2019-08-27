using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Persistence.Repository;

namespace Backend.Persistence.Repository
{
    public interface ITimetableRepository : IRepository<Timetable, int>
    {
        IQueryable<Timetable> GetTimetables();
    }
}
