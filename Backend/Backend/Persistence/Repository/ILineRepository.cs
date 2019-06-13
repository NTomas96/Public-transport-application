using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Persistence.Repository
{
    public interface ILineRepository : IRepository<Line,int>
    {
        IQueryable<Line> GetLines();
        IQueryable<Line> GetLinesWithWaypoints();

        Line GetLineWithWaypoints(int id);
    }
}
