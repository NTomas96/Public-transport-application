using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Backend.Models;
using Backend.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Backend.Persistence.Repository
{
    public class StationRepository : Repository<Station, int>, IStationRepository
    {
        protected AppDbContext appDbContext { get { return context as AppDbContext; } }

        public StationRepository(DbContext context) : base(context)
        {

        }

        public IQueryable<Station> GetStations()
        {
            return appDbContext.Stations;
        }

        public IQueryable<Station> GetStationsWithLines()
        {
            return appDbContext.Stations.Include(s => s.Lines);
        }

        public Station GetStationWithLines(int id)
        {
            return appDbContext.Stations.Include(s => s.Lines).ThenInclude(sl => sl.Line).Where(s => s.Id == id).FirstOrDefault();
        }
    }
}