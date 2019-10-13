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

        IQueryable<Station> IStationRepository.GetStations()
        {
            return appDbContext.Stations;
        }
    }
}