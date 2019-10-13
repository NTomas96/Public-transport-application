using Backend.Persistence.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Persistence.UnitOfWork
{
    public class DemoUnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;

        public DemoUnitOfWork(DbContext context)
        {
            _context = context;

            Users = new UserRepository(context);
            Lines = new LineRepository(context);
            Stations = new StationRepository(context);
            Timetables = new TimetableRepository(context);
            Pricelists = new PricelistRepository(context);
            Vehicles = new VehicleRepository(context);
            Tickets = new TicketRepository(context);
        }

        public IUserRepository Users { get; set; }
        public ILineRepository Lines { get; set; }
        public IStationRepository Stations { get; set; }
        public ITimetableRepository Timetables { get; set; }
        public IPricelistRepository Pricelists { get; set; }
        public IVehicleRepository Vehicles { get; set; }
        public ITicketRepository Tickets { get; set; }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
