using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Backend.Models;
using Backend.Models.Web;
using Backend.Persistence;
using Backend.Persistence.UnitOfWork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class StationsController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;


        public StationsController(IUnitOfWork u)
        {
            this.unitOfWork = u;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IQueryable<Station>))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult GetStations()
        {

            return Success(unitOfWork.Stations.GetStations());
        }
    }
}