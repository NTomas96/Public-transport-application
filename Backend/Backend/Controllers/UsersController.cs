using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Backend.Models;
using Backend.Models.Web;
using Backend.Persistence;
using Backend.Util;
using Microsoft.IdentityModel.Tokens;
using WebApp.Persistence.UnitOfWork;

namespace Backend.Controllers
{
    public class UsersController : BetterApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public UsersController(IUnitOfWork u)
        {
            this.unitOfWork = u;
        }

        [Route("api/Users/Register")]
        [HttpPost]
        public IHttpActionResult Register(User user)
        {
            user.UserType = UserType.Passenger;
            user.Id = 0;
            user.Password = Hash.Sha256Hash(user.Password);

            if(user.PassengerType != PassengerType.Regular)
            {
                user.VerificationStatus = VerificationStatus.Processing;
                user.Active = false;
            }
            else
            {
                user.VerificationStatus = VerificationStatus.Accepted;
                user.Active = true;
                user.AdditionalInfo = null;
            }

            unitOfWork.Users.Add(user);
            unitOfWork.Complete();


            return JsonResult(user);
        }

        [Route("api/Users/Login")]
        [HttpPost]
        public IHttpActionResult Login(User cred)
        {
            User user = unitOfWork.Users.GetUserByEmail(cred.Email);

            if (user != null && user.Password == Util.Hash.Sha256Hash(cred.Password))
            {
                var userToken = JwtManager.GenerateToken(user);

                var response = new LoginResponse();
                response.Token = userToken;
				user.Password = "";
                response.UserType = user.UserType;

                return JsonResult(response);
            }
            else
            {
                return ErrorResult(5001, "User not found!");
            }
        }

        [Route("api/Users/EditProfile")]
        [JwtAuthorize]
        [HttpPost]
        public IHttpActionResult EditProfile(User profile)
        {
            var principal = Thread.CurrentPrincipal as JwtPrincipal;

            User user = unitOfWork.Users.GetUserById(principal.UserId);
            if (user != null)
            {
                user.FirstName = profile.FirstName;
                user.LastName = profile.LastName;
                user.Email = profile.Email;
                user.DayOfBirth = profile.DayOfBirth;
                user.Address = profile.Address;
                
                if(profile.AdditionalInfo!=null)
                {
                    if(user.AdditionalInfo != null)
                    {
                        if(user.AdditionalInfo != profile.AdditionalInfo)
                        {
                            user.Active = false;
                            user.VerificationStatus = VerificationStatus.Processing;
                            user.AdditionalInfo = profile.AdditionalInfo;
                        }
                    }
                }

                if(!profile.Password.Equals("******"))
                {
                    user.Password = Hash.Sha256Hash(profile.Password);
                }

                unitOfWork.Complete();

                return JsonResult(true);
            }

            return ErrorResult(6001, "Unexpected error somehow managed to occur. God help us.");
        }

        // GET: api/Users/5
        [Route("api/Users/Me")]
        [JwtAuthorize(new UserType[] { UserType.Passenger })]
        public IHttpActionResult GetMe()
        {
            var principal = Thread.CurrentPrincipal as JwtPrincipal;

            User user = unitOfWork.Users.GetUserById(principal.UserId);
            if (user != null)
            {
                user.Password = "******";
                return JsonResult(user);
            }

            return ErrorResult(6001, "Unexpected error somehow managed to occur. God help us.");
        }

        [Route("api/Users/Unverified")]
        [JwtAuthorize(new UserType[] { UserType.Controller })]
        public IHttpActionResult GetUnverified()
        {
            return JsonResult(unitOfWork.Users.GetUnverifiedUsers());
        }

        [Route("api/Users/Verify/Accept/{userId}")]
        [HttpPost]
        [JwtAuthorize(new UserType[] { UserType.Controller })]
        public IHttpActionResult Accept(int userId)
        {
            User user = unitOfWork.Users.GetUserById(userId);

            if(user != null && user.UserType == UserType.Passenger && user.VerificationStatus == VerificationStatus.Processing)
            {
                user.VerificationStatus = VerificationStatus.Accepted;
                user.Active = true;
                user.AdditionalInfo = "";
                unitOfWork.Complete();

                return JsonResult(null);
            }
            else
            {
                return ErrorResult(7001, "User not found.");
            }

            
        }

        [Route("api/Users/Verify/Deny/{userId}")]
        [HttpPost]
        [JwtAuthorize(new UserType[] { UserType.Controller })]
        public IHttpActionResult Deny(int userId)
        {
            User user = unitOfWork.Users.GetUserById(userId);

            if (user != null && user.UserType == UserType.Passenger && user.VerificationStatus == VerificationStatus.Processing)
            {
                user.VerificationStatus = VerificationStatus.Denied;
                user.Active = false;
                user.AdditionalInfo = "";
                unitOfWork.Complete();

                return JsonResult(null);
            }
            else
            {
                return ErrorResult(7001, "User not found.");
            }
        }

        [Route("api/Users/CheckTicket/{ticketNumber}")]
        [HttpPost]
        [JwtAuthorize(new UserType[] { UserType.Controller })]
        public IHttpActionResult CheckTicket(string ticketNumber)
        {
            Ticket ticket = unitOfWork.Tickets.GetTicketBySerial(ticketNumber);

            if (ticket != null)
            {
                return JsonResult(ticket.IsValid());
            }
            else
            {
                return JsonResult(false);
            }
        }
    }
}