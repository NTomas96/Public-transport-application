using Backend.Persistence.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Persistence.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; set; }
        ILineRepository Lines { get; set; }
        IStationRepository Stations { get; set; }
        ITimetableRepository Timetables { get; set; }
        IPricelistRepository Pricelists { get; set; }
        IVehicleRepository Vehicles { get; set; }
        ITicketRepository Tickets { get; set; }

        int Complete();
    }
}
