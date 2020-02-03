using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Persistence.Repository
{
    public interface IStationRepository : IRepository<Station,int>
    {
        IQueryable<Station> GetStations();
        IQueryable<Station> GetStationsWithLines();
        Station GetStationWithLines(int id);
    }
}
