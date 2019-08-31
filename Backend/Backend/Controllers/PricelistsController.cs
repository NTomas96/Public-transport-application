using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApp.Persistence.UnitOfWork;

namespace Backend.Controllers
{
    public class PricelistsController : BetterApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public PricelistsController(IUnitOfWork u)
        {
            this.unitOfWork = u;
        }

        [Route("api/Pricelists/{ticketType}/{passengerType}")]
        public IHttpActionResult Get(TicketType ticketType, PassengerType passengerType)
        {
            Pricelist price = this.unitOfWork.Pricelists.GetTicketPrice(ticketType, passengerType);

            if(price != null)
            {
                return JsonResult(price);
            }
            else
            {
                return ErrorResult(6001, "Price not found.");
            }
        }
    }
}
