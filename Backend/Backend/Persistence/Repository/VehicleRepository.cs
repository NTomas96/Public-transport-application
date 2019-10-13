using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Persistence.Repository
{
    public class VehicleRepository : Repository<Vehicle, int>, IVehicleRepository
    {
        protected AppDbContext appDbContext { get { return context as AppDbContext; } }

        public VehicleRepository(DbContext context) : base(context)
        {

        }

        public IQueryable<Vehicle> GetVehicles()
        {
            return appDbContext.Vehicles;
        }

        public Vehicle GetVehicleByTrackerSerial(string busId)
        {
            return appDbContext.Vehicles.Include(v => v.Line).Where(v => busId.Equals(v.TrackerSerial)).FirstOrDefault();
        }
    }
}