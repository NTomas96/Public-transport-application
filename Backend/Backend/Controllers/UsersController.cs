using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Web.Http;
using Backend.Models;
using Backend.Models.Web;
using Backend.Persistence;
using Backend.Persistence.UnitOfWork;
using Backend.Util;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class UsersController : ApiController
    {
        
        private readonly IUnitOfWork unitOfWork;
        private readonly AppSettings appSettings;

        public UsersController(IUnitOfWork u, IOptions<AppSettings> appSettings)
        {
            this.unitOfWork = u;
            this.appSettings = appSettings.Value;
        }

        [HttpPost("register")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult Register([FromBody]User user)
        {
            if(user.checkUserProperties())
            {
                user.UserType = UserType.Passenger;
                user.Id = 0;
                user.Password = Hash.Sha256Hash(user.Password);

                if (user.PassengerType != PassengerType.Regular)
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


                return Success(user);
            }

            return Error(442, "Greska! Proverite da li ste uneli sva polja.");
        }

        [HttpPost("login")]
        [ProducesResponseType(200, Type = typeof(LoginResponse))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult Login([FromBody]User cred)
        {
            User user = unitOfWork.Users.GetUserByEmail(cred.Email);

            if (user != null && user.Password == Util.Hash.Sha256Hash(cred.Password))
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(appSettings.JwtSecret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.Id.ToString()),
                        new Claim(ClaimTypes.Role, user.UserType.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var userToken = tokenHandler.WriteToken(token);

                var response = new LoginResponse();
                response.Token = userToken;
                response.UserType = user.UserType;

                return Success(response);
            }
            else
            {
                return Error(5001, "User not found!");
            }
        }
        
        [HttpPost("editprofile")]
        [Authorize(Roles = "Passenger")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult EditProfile([FromBody] User profile)
        {
            User user = GetUser(unitOfWork);

            if (user != null)
            {
                if(profile.checkUserProperties() && !(String.IsNullOrEmpty(profile.AdditionalInfo) || String.IsNullOrWhiteSpace(profile.AdditionalInfo)))
                {
                    user.FirstName = profile.FirstName;
                    user.LastName = profile.LastName;
                    user.Email = profile.Email;
                    user.DayOfBirth = profile.DayOfBirth;
                    user.Address = profile.Address;

                    if (user.AdditionalInfo != null)
                    {
                        if (user.AdditionalInfo != profile.AdditionalInfo)
                        {
                            user.Active = false;
                            user.VerificationStatus = VerificationStatus.Processing;
                            user.AdditionalInfo = profile.AdditionalInfo;
                        }
                    }

                    if (!profile.Password.Equals("******"))
                    {
                        user.Password = Hash.Sha256Hash(profile.Password);
                    }

                    unitOfWork.Complete();

                    return Success(true);
                }

                return Error(442, "Greska! Proverite da li ste uneli sve podatke.");
                
            }

            return Error(6001, "Unexpected error somehow managed to occur. God help us.");
        }

        [HttpGet("me")]
        [Authorize(Roles = "Passenger")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult GetMe()
        {
            User user = GetUser(unitOfWork);
            if (user != null)
            {
                user.Password = "******";
                return Success(user);
            }

            return Error(6001, "Unexpected error somehow managed to occur. God help us.");
        }

        [HttpGet("unverified")]
        [Authorize(Roles = "Controller")]
        [ProducesResponseType(200, Type = typeof(IQueryable<User>))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult GetUnverified()
        {
            return Success(unitOfWork.Users.GetUnverifiedUsers());
        }

        [HttpPost("verify/accept/{userId}")]
        [Authorize(Roles = "Controller")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult Accept(int userId)
        {
            User user = unitOfWork.Users.GetUserById(userId);

            if(user != null && user.UserType == UserType.Passenger && user.VerificationStatus == VerificationStatus.Processing)
            {
                user.VerificationStatus = VerificationStatus.Accepted;
                user.Active = true;
                user.AdditionalInfo = "";
                unitOfWork.Complete();

                return Success(true);
            }
            else
            {
                return Error(7001, "User not found.");
            }

            
        }

        [HttpPost("verify/deny/{userId}")]
        [Authorize(Roles = "Controller")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult Deny(int userId)
        {
            User user = unitOfWork.Users.GetUserById(userId);

            if (user != null && user.UserType == UserType.Passenger && user.VerificationStatus == VerificationStatus.Processing)
            {
                user.VerificationStatus = VerificationStatus.Denied;
                user.Active = false;
                user.AdditionalInfo = "";
                unitOfWork.Complete();

                return Success(true);
            }
            else
            {
                return Error(7001, "User not found.");
            }
        }

        [HttpPost("checkTicket/{ticketNumber}")]
        [Authorize(Roles = "Controller")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400, Type = typeof(ErrorApiResponse))]
        public IActionResult CheckTicket(string ticketNumber)
        {
            Ticket ticket = unitOfWork.Tickets.GetTicketBySerial(ticketNumber);

            if (ticket != null)
            {
                return Success(ticket.IsValid());
            }
            else
            {
                return Success(false);
            }
        }
    }
}