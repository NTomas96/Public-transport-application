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
using Backend.Models.Web;
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

        [Route("api/Lines/Bus")]
        [HttpPost]
        public IHttpActionResult Bus([FromBody] BusJson data)
        {
            Vehicle vehicle = unitOfWork.Vehicles.GetVehicleByTrackerSerial(data.TrackerSerial);

            if(vehicle != null)
            {
                vehicle.Lat = data.GeoLocation.Lat;
                vehicle.Lon = data.GeoLocation.Lon;

                BusHub.SayHello(vehicle);
            }

            return JsonResult(null);
        }
    }
}