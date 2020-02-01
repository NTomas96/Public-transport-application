using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Backend.Models;
using Backend.Models.Web;
using Backend.Persistence;
using Newtonsoft.Json;
using Backend.Persistence.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using Backend.Util;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class LinesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public LinesController(IUnitOfWork u)
        {
            this.unitOfWork = u;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IQueryable<Line>))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult GetLines()
        {
            return Success(unitOfWork.Lines.GetLines());
        }

        [HttpGet("withStations")]
        [ProducesResponseType(200, Type = typeof(IQueryable<Line>))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult GetLinesWithStations()
        {
            return Success(unitOfWork.Lines.GetLinesWithStations());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Line))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult GetLine(int id)
        {
            Line line = unitOfWork.Lines.GetLineWithStations(id);
            if (line == null)
            {
                return Error(2001, "Line doesn't exist.");
            }

            return Success(line);
        }

        /*
        [Route("api/Lines/Bus")]
        [HttpPost]
        public IActionResult Bus([FromBody] BusJson data)
        {
            Vehicle vehicle = unitOfWork.Vehicles.GetVehicleByTrackerSerial(data.TrackerSerial);

            if(vehicle != null)
            {
                vehicle.Lat = data.GeoLocation.Lat;
                vehicle.Lon = data.GeoLocation.Lon;

                BusHub.SayHello("Hello");
            }
            return JsonResult(null);
        }
        */
        
    }
}