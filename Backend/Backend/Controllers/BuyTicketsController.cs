using Backend.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using Backend.Persistence.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PayPalCheckoutSdk.Orders;
using Backend.Util;
using Backend.Models.Web;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class BuyTicketsController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public BuyTicketsController(IUnitOfWork u)
        {
            this.unitOfWork = u;
        }

        [Authorize]
        [AllowAnonymous]
        [HttpPost("{ticketType}/{orderId}")]
        [ProducesResponseType(200, Type = typeof(Ticket))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public async Task<IActionResult> BuyTicket(TicketType ticketType, string orderId)
        {
            
            bool userAllowedToBuyTicket = false;
            User myUser = null;

            if (ticketType == TicketType.TimeTicket)
                userAllowedToBuyTicket = true;

            PassengerType myType = PassengerType.Regular;

            User user = GetUser(unitOfWork);

            if (user != null)
            {
                myUser = user;
                myType = user.PassengerType;
                userAllowedToBuyTicket = user.Active;
            }

            if (userAllowedToBuyTicket)
            {
                Pricelist price = this.unitOfWork.Pricelists.GetTicketPrice(ticketType, myType);

                if (price != null)
                {
                    
                    OrdersGetRequest request = new OrdersGetRequest(orderId);
                    var response = await PayPalClient.client().Execute(request);
                    
                    var result =  response.Result<Order>();

                    if(result.Status.Equals("COMPLETED"))
                    {
                        string value = result.PurchaseUnits[0].AmountWithBreakdown.Value;
                        float floatValue = float.Parse(value);

                        if(floatValue == price.Price)
                        {
                            Ticket ticket = new Ticket();
                            ticket.PayPalOrderId = result.Id;
                            ticket.TimeBought = DateTime.Now;
                            ticket.PayPalData = JsonConvert.SerializeObject(result);
                            ticket.TicketType = price.TicketType;

                            while(true)
                            {
                                string number = RandomUtil.RandomString(15);

                                if(unitOfWork.Tickets.GetTicketBySerial(number) == null)
                                {
                                    ticket.TicketNumber = number;
                                    break;
                                }
                            }

                            if(myUser != null)
                            {
                                ticket.User = myUser;
                            }

                            unitOfWork.Tickets.Add(ticket);
                            unitOfWork.Complete();

                            return Success(ticket);
                        }
                        else
                        {
                            return Error(9001, "Paid amount doesn't match ticket price.");
                        }
                    }
                    else
                    {
                        return Error(9002, "Payment not completed.");
                    }
                }
                else
                {
                    return Error(9003, "Price not found.");
                }
            }
            else
            {
                return Error(9004, "User not allowed to buy the selected ticket.");
            }
        }
    }
}
