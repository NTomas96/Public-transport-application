using Backend.Models;
using Backend.Util;
using Newtonsoft.Json;
using PayPalCheckoutSdk.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApp.Persistence.UnitOfWork;

namespace Backend.Controllers
{
    public class BuyTicketsController : BetterApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public BuyTicketsController(IUnitOfWork u)
        {
            this.unitOfWork = u;
        }

        [Route("api/BuyTickets/{ticketType}/{orderId}")]
        [JwtAuthorize(DontBlock = true)]
        [HttpPost]
        public async Task<IHttpActionResult> BuyTickets(TicketType ticketType, string orderId)
        {
            bool userAllowedToBuyTicket = false;
            User myUser = null;

            if (ticketType == TicketType.TimeTicket)
                userAllowedToBuyTicket = true;

            PassengerType myType = PassengerType.Regular;

            if(Thread.CurrentPrincipal is JwtPrincipal)
            {
                User user = unitOfWork.Users.GetUserById(((JwtPrincipal)Thread.CurrentPrincipal).UserId);

                if(user != null)
                {
                    myUser = user;
                    myType = user.PassengerType;
                    userAllowedToBuyTicket = user.Active;
                }
            }

            if(userAllowedToBuyTicket)
            {
                Pricelist price = this.unitOfWork.Pricelists.GetTicketPrice(ticketType, myType);

                if (price != null)
                {
                    
                    OrdersGetRequest request = new OrdersGetRequest(orderId);
                    //3. Call PayPal to get the transaction
                    var response = await PayPalClient.client().Execute(request);
                    
                    //4. Save the transaction in your database. Implement logic to save transaction to your database for future reference.
                    var result =  response.Result<Order>();

                    if(result.Status.Equals("COMPLETED"))
                    {
                        string value = result.PurchaseUnits[0].AmountWithBreakdown.Value;
                        float floatValue = float.Parse(value);

                        if(floatValue == price.Price)
                        {
                            Console.WriteLine("a");
                            //TODO: add ticket

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

                            return JsonResult(ticket);
                        }
                        else
                        {
                            return ErrorResult(9001, "Paid amount doesn't match ticket price.");
                        }
                    }
                    else
                    {
                        return ErrorResult(9002, "Payment not completed.");
                    }
                }
                else
                {
                    return ErrorResult(9003, "Price not found.");
                }
            }
            else
            {
                return ErrorResult(9004, "User not allowed to buy the selected ticket.");
            }
        }
    }
}
