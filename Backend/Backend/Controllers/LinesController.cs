﻿using System;
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
    public class LinesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        /*
       dynamic stuff = JsonConvert.DeserializeObject(File.ReadAllText("C:\\Users\\Spajk\\Desktop\\lines.json"));
       List<Line> lines = new List<Line>();

       foreach(dynamic obj in stuff)
       {
           Line line = new Line();
           line.Color = obj.color;
           line.Name = obj.name;

           line.Waypoints = new List<GeoLocation>();

           foreach(dynamic point in obj.waypoints)
           {
               GeoLocation geo = new GeoLocation();
               geo.Lat = point.lat;
               geo.Lon = point.lon;
               line.Waypoints.Add(geo);
           }

           lines.Add(line);
       }

       unitOfWork.Lines.AddRange(lines.AsEnumerable());
       unitOfWork.Complete();
       */

        public LinesController(IUnitOfWork u)
        {
            this.unitOfWork = u;
        }

        // GET: api/Lines
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IQueryable<Line> GetLines()
        {
            return unitOfWork.Lines.GetLines();
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