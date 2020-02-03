using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Backend.Models;
using Backend.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Backend.Persistence.Repository
{
    public class LineRepository : Repository<Line, int>, ILineRepository
    {
        protected AppDbContext appDbContext { get { return context as AppDbContext; } }

        public LineRepository(DbContext context) : base(context)
        {

        }

        public IQueryable<Line> GetLines()
        {
            return appDbContext.Lines;
        }

        public IQueryable<Line> GetLinesWithStations()
        {
            List<Line> var = appDbContext.Lines.Include(l => l.Stations).ThenInclude(sl => sl.Station).ToList();

            return appDbContext.Lines.Include(l => l.Stations);
        }

        public Line GetLineWithStations(int id)
        {
            return appDbContext.Lines.Include(l => l.Stations).ThenInclude(sl => sl.Station).Where(l => l.Id == id).FirstOrDefault();
        }
    }
}