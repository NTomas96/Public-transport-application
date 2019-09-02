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
using Backend.Hubs;
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
            return JsonResult(unitOfWork.Lines.GetLinesWithStations());
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

        [Route("api/Lines/Bus/{busId}")]
        [HttpPost]
        public IHttpActionResult Bus(string busId, [FromBody] dynamic data)
        {
            Vehicle vehicle = unitOfWork.Vehicles.GetVehicleByTrackerSerial(busId);

            BusHub.SayHello();

            return JsonResult(null);
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