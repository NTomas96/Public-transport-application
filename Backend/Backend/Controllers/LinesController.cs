using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Backend.Models;
using Backend.Persistence;
using Newtonsoft.Json;
using WebApp.Persistence.UnitOfWork;

namespace Backend.Controllers
{
    public class LinesController : BetterApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public LinesController(IUnitOfWork u)
        {
            this.unitOfWork = u;
        }

        // GET: api/Lines
        public IHttpActionResult GetLines()
        {            
           return JsonResult(unitOfWork.Lines.GetLines());
        }

        [Route("api/Lines/WithStations")]
        public IHttpActionResult GetLinesWitStations()
        {

            var lines = unitOfWork.Lines.GetLines();
            
            //List<Vehicle> buses = new List<Vehicle>();
            List<Timetable> timetables = new List<Timetable>();


            foreach (Line l in lines)
            {
                /*for (int i = 0; i < 3; i++)
                {
                    Vehicle bus = new Vehicle();
                    bus.TrackerSerial = "SN_Line" + l.Id + "_BusNO:" + i;
                    bus.Name = "BUS";
                    bus.Line = l;
                    bus.Lat = 0;
                    bus.Lon = 0;

                    buses.Add(bus);
                }
                */

                List<long> tList = new List<long>();

                for (int j = 0; j <= 6; j++)
                {
                    Timetable timetable = new Timetable();
                    timetable.Line = l;
                    timetable.DayOfWeek = (DayOfWeek)j;
                    for (int i = 21600; i <= 86400; i += 1800)
                    {
                        tList.Add(i);
                    }

                    timetable.Departures = tList;

                    timetables.Add(timetable);
                }

            }

           
            //unitOfWork.Vehicles.AddRange(buses.AsEnumerable());
            unitOfWork.Timetables.AddRange(timetables.AsEnumerable());
            unitOfWork.Complete();

            return null;
            // return JsonResult(unitOfWork.Lines.GetLinesWithStations());
        }

        
        public IHttpActionResult GetLine(int id)
        {
            Line line = unitOfWork.Lines.GetLineWithStations(id);
            if (line == null)
            {
                return ErrorResult(2001, "Line doesn't exist.");
            }

            return JsonResult(line);
        }

        /*
        // GET: api/Lines/5
        [ResponseType(typeof(Line))]
        public IHttpActionResult GetLine(int id)
        {
            Line line = db.Lines.Find(id);
            if (line == null)
            {
                return NotFound();
            }

            return Ok(line);
        }

        // PUT: api/Lines/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLine(int id, Line line)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != line.Id)
            {
                return BadRequest();
            }

            db.Entry(line).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LineExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Lines
        [ResponseType(typeof(Line))]
        public IHttpActionResult PostLine(Line line)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Lines.Add(line);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = line.Id }, line);
        }

        // DELETE: api/Lines/5
        [ResponseType(typeof(Line))]
        public IHttpActionResult DeleteLine(int id)
        {
            Line line = db.Lines.Find(id);
            if (line == null)
            {
                return NotFound();
            }

            db.Lines.Remove(line);
            db.SaveChanges();

            return Ok(line);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LineExists(int id)
        {
            return db.Lines.Count(e => e.Id == id) > 0;
        }
        */
    }
}