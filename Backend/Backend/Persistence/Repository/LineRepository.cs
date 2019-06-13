using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Backend.Models;
using Backend.Persistence;

namespace WebApp.Persistence.Repository
{
    public class LineRepository : Repository<Line, int>, ILineRepository
    {
        protected AppDbContext appDbContext { get { return context as AppDbContext; } }

        public LineRepository(DbContext context) : base(context)
        {

        }

        public IQueryable<Line> GetLines()
        {
            return appDbContext.Lines.Include(l => l.Waypoints);
        }
    }
}