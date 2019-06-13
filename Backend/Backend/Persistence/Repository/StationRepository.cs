using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Backend.Models;
using Backend.Persistence;

namespace WebApp.Persistence.Repository
{
    public class StationRepository : Repository<Station, int>, IStationRepository
    {
        protected AppDbContext appDbContext { get { return context as AppDbContext; } }

        public StationRepository(DbContext context) : base(context)
        {

        }

        IQueryable<Station> IStationRepository.GetStations()
        {
            return appDbContext.Stations;
        }
    }
}