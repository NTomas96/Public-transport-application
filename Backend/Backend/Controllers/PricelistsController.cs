using Backend.Models;
using Backend.Models.Web;
using Backend.Persistence.UnitOfWork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class PricelistsController : ApiController
    {
        
        private readonly IUnitOfWork unitOfWork;

        public PricelistsController(IUnitOfWork u)
        {
            this.unitOfWork = u;
        }

        [Authorize]
        [AllowAnonymous]
        [HttpGet("me/{ticketType}")]
        [ProducesResponseType(200, Type = typeof(Pricelist))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult GetPricelistMe(TicketType ticketType)
        {
            bool userAllowedToBuyTicket = false;

            if (ticketType == TicketType.TimeTicket)
                userAllowedToBuyTicket = true;

            PassengerType myType = PassengerType.Regular;

            User user = GetUser(unitOfWork);

            if (user != null)
            {
                myType = user.PassengerType;
                userAllowedToBuyTicket = user.Active;
            }

            if (userAllowedToBuyTicket)
            {
                Pricelist price = this.unitOfWork.Pricelists.GetTicketPrice(ticketType, myType);

                if (price != null)
                {
                    return Success(price);
                }
                else
                {
                    return Error(6002, "Price not found.");
                }
            }
            else
            {
                return Error(6003, "User not allowed to buy the selected ticket.");
            }
        }

        [HttpGet("{ticketType}/{passengerType}")]
        [ProducesResponseType(200, Type = typeof(Pricelist))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult GetPricelist(TicketType ticketType, PassengerType passengerType)
        {
            Pricelist price = this.unitOfWork.Pricelists.GetTicketPrice(ticketType, passengerType);

            if(price != null)
            {
                return Success(price);
            }
            else
            {
                return Error(6001, "Price not found.");
            }
        }
    }
}
