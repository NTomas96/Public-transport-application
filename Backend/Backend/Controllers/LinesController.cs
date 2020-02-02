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
using Models.Web.Bus;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class LinesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IHubContext<BusHub> hubContext;

        public LinesController(IUnitOfWork u, IHubContext<BusHub> hubContext)
        {
            this.unitOfWork = u;
            this.hubContext = hubContext;
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


        [HttpPost("bus")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult Bus([FromBody] BusJson data)
        {
            Vehicle vehicle = unitOfWork.Vehicles.GetVehicleByTrackerSerial(data.SerialNumber);

            if(vehicle != null)
            {
                vehicle.Lat = data.Lat;
                vehicle.Lon = data.Lon;

                unitOfWork.Vehicles.Update(vehicle);

                hubContext.Clients.All.SendAsync("UpdateVehicle", vehicle.Id, vehicle.Line.Id, vehicle.Lat, vehicle.Lon);
            }

            return Success(true);
        }
    }
}