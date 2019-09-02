using Backend.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Persistence.Repository;

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
            return appDbContext.Vehicles.Where(v => busId.Equals(v.TrackerSerial)).FirstOrDefault();
        }
    }
}