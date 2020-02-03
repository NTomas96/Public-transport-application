using Backend.Models;
using Backend.Models.Web;
using Backend.Persistence.UnitOfWork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class AdminController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public AdminController(IUnitOfWork u)
        {
            this.unitOfWork = u;
        }

        #region Lines
        [HttpGet("lines")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(IQueryable<Line>))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult GetLines()
        {
            return Success(unitOfWork.Lines.GetAll());
        }

        [HttpGet("lines/{id}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(Line))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult GetLine(int id)
        {
            var item = unitOfWork.Lines.GetLineWithStations(id);

            if (item == null)
            {
                return Error(8001, "Line not found!");
            }

            return Success(item);
        }

        [HttpPost("lines")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult AddLine([FromBody] Line item)
        {
            try
            {
                item.Id = 0;
                unitOfWork.Lines.Add(item);
                unitOfWork.Complete();

                return Success(true);
            }
            catch
            {
                return Error(8002, "Error while saving. Are you sure that Line doesn't already exist?");
            }

        }

        [HttpPost("lines/{id}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult EditLine(int id, [FromBody] Line item)
        {
            try
            {
                var oldItem = unitOfWork.Lines.GetLineWithStations(id);

                oldItem.Color = item.Color;
                oldItem.LineType = item.LineType;
                oldItem.Name = item.Name;

                if(item.Stations != null)
                {
                    List<StationLine> toAdd = new List<StationLine>();
                    List<StationLine> toRemove = new List<StationLine>();

                    foreach (var s in item.Stations)
                    {
                        if (oldItem.Stations.Find(sl => sl.StationId == s.StationId && sl.LineId == s.LineId) == null)
                        {
                            toAdd.Add(s);
                        }
                    }

                    foreach (var s in oldItem.Stations)
                    {
                        if (item.Stations.Find(sl => sl.StationId == s.StationId && sl.LineId == s.LineId) == null)
                        {
                            toRemove.Add(s);
                        }
                    }

                    foreach (var elm in toRemove)
                    {
                        oldItem.Stations.Remove(elm);
                    }
                    foreach (var elm in toAdd)
                    {
                        elm.Station = null;
                        elm.Line = null;
                        elm.LineId = oldItem.Id;

                        oldItem.Stations.Add(elm);
                    }
                }
                

                oldItem.Waypoints = item.Waypoints;

                unitOfWork.Lines.Update(oldItem);
                unitOfWork.Complete();

                return Success(true);
            }
            catch(Exception e)
            {
                return Error(8003, "Error while editing. Are you sure that Line exists?");
            }
        }

        [HttpDelete("lines/{id}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult DeleteLine(int id)
        {
            try
            {
                Line line = new Line() { Id = id };
                unitOfWork.Lines.Remove(line);
                unitOfWork.Complete();

                return Success(true);
            }
            catch
            {
                return Error(8004, "Error while deleting. Are you sure that Line exists?");
            }
        }
        #endregion

        #region Stations
        [HttpGet("stations")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(IQueryable<Station>))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult GetStations()
        {
            return Success(unitOfWork.Stations.GetAll());
        }

        [HttpGet("stations/{id}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(Station))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult GetStation(int id)
        {
            var item = unitOfWork.Stations.GetStationWithLines(id);

            if (item == null)
            {
                return Error(8101, "Station not found!");
            }

            return Success(item);
        }

        [HttpPost("stations")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult AddStation([FromBody] Station item)
        {
            try
            {
                item.Id = 0;
                unitOfWork.Stations.Add(item);
                unitOfWork.Complete();

                return Success(true);
            }
            catch
            {
                return Error(8102, "Error while saving. Are you sure that Station doesn't already exist?");
            }

        }

        [HttpPost("stations/{id}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult EditStation(int id, [FromBody] Station item)
        {
            try
            {
                var oldItem = unitOfWork.Stations.GetStationWithLines(id);

                oldItem.Lat = item.Lat;
                oldItem.Lon = item.Lon;
                oldItem.Name = item.Name;

                if(item.Lines != null)
                {
                    List<StationLine> toAdd = new List<StationLine>();
                    List<StationLine> toRemove = new List<StationLine>();

                    foreach (var s in item.Lines)
                    {
                        if (oldItem.Lines.Find(sl => sl.StationId == s.StationId && sl.LineId == s.LineId) == null)
                        {
                            toAdd.Add(s);
                        }
                    }

                    foreach (var s in oldItem.Lines)
                    {
                        if (item.Lines.Find(sl => sl.StationId == s.StationId && sl.LineId == s.LineId) == null)
                        {
                            toRemove.Add(s);
                        }
                    }

                    foreach (var elm in toRemove)
                    {
                        oldItem.Lines.Remove(elm);
                    }
                    foreach (var elm in toAdd)
                    {
                        elm.Line = null;
                        elm.Station = null;
                        elm.StationId = oldItem.Id;

                        oldItem.Lines.Add(elm);
                    }
                }

                unitOfWork.Stations.Update(oldItem);
                unitOfWork.Complete();

                return Success(true);
            }
            catch
            {
                return Error(8103, "Error while editing. Are you sure that Station exists?");
            }
        }

        [HttpDelete("stations/{id}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult DeleteStation(int id)
        {
            try
            {
                Station line = new Station() { Id = id };
                unitOfWork.Stations.Remove(line);
                unitOfWork.Complete();

                return Success(true);
            }
            catch
            {
                return Error(8104, "Error while deleting. Are you sure that Station exists?");
            }
        }

        #endregion

        #region Timetables
        [HttpGet("timetables/{lineId}/{day}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(Timetable))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult GetTimeTable(int lineId, DayOfWeek day)
        {
            var item = unitOfWork.Timetables.GetTimetable(lineId, day);

            if (item == null)
            {
                item = new Timetable();
                item.Line = new Line() { Id = lineId };
                item.DayOfWeek = day;
                item.Departures = new List<long>();
            }
            else
            {
                // TODO: this is a workaround
                item.Line = new Line() { Id = lineId };
            }

            return Success(item);
        }

        [HttpPost("timetables/{lineId}/{day}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult EditTimeTable(int lineId, DayOfWeek day, [FromBody] Timetable newItem)
        {
            try
            {
                var item = unitOfWork.Timetables.GetTimetable(lineId, day);

                if (item == null)
                {
                    item = new Timetable();
                    item.Line = unitOfWork.Lines.Get(lineId);
                    item.DayOfWeek = day;
                    item.Departures = newItem.Departures;

                    unitOfWork.Timetables.Add(item);
                    unitOfWork.Complete();

                    return Success(true);
                }

                item.Departures = newItem.Departures;
                
                unitOfWork.Timetables.Update(item);
                unitOfWork.Complete();

                return Success(true);
            }
            catch
            {
                return Error(11002, "Error while editing Timetable. Unexpected error has occured.");
            }
        }

        #endregion

        #region Pricelists
        [HttpGet("pricelists/{ticketType}/{passengerType}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(Pricelist))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult GetTicketPrice(TicketType ticketType, PassengerType passengerType)
        {
            var item = unitOfWork.Pricelists.GetTicketPrice(ticketType, passengerType);

            if (item == null)
            {
                item = new Pricelist();
                item.TicketType = ticketType;
                item.PassengerType = passengerType;
                item.Price = 0;
            }

            return Success(item);
        }

        [HttpPost("pricelists/{ticketType}/{passengerType}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult SetTicketPrice(TicketType ticketType, PassengerType passengerType, [FromBody] Pricelist newItem)
        {
            try
            {
                var item = unitOfWork.Pricelists.GetTicketPrice(ticketType, passengerType);

                if (item == null)
                {
                    item = new Pricelist();
                    item.TicketType = ticketType;
                    item.PassengerType = passengerType;
                    item.Price = newItem.Price;

                    unitOfWork.Pricelists.Add(item);
                    unitOfWork.Complete();

                    return Success(true);
                }

                item.Price = newItem.Price;

                unitOfWork.Pricelists.Update(item);
                unitOfWork.Complete();

                return Success(true);
            }
            catch
            {
                return Error(12002, "Error while editing Pricelist. Unexpected error has occured.");
            }
        }
        #endregion
    }
}
