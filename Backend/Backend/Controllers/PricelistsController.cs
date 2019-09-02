using Backend.Models;
using Backend.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
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

        [Route("api/Pricelists/Me/{ticketType}")]
        [JwtAuthorize(DontBlock = true)]
        public IHttpActionResult Get(TicketType ticketType)
        {
            bool userAllowedToBuyTicket = false;

            if (ticketType == TicketType.TimeTicket)
                userAllowedToBuyTicket = true;

            PassengerType myType = PassengerType.Regular;

            if(Thread.CurrentPrincipal is JwtPrincipal)
            {
                User user = unitOfWork.Users.GetUserById(((JwtPrincipal)Thread.CurrentPrincipal).UserId);

                if(user != null)
                {
                    myType = user.PassengerType;
                    userAllowedToBuyTicket = user.Active;
                }
            }

            if(userAllowedToBuyTicket)
            {
                Pricelist price = this.unitOfWork.Pricelists.GetTicketPrice(ticketType, myType);

                if (price != null)
                {
                    return JsonResult(price);
                }
                else
                {
                    return ErrorResult(6002, "Price not found.");
                }
            }
            else
            {
                return ErrorResult(6003, "User not allowed to buy the selected ticket.");
            }
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
