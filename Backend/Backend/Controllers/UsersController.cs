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

        // 
        [Route("api/Users/Register")]
        [HttpPost]
        public IHttpActionResult Register(User user)
        {
            user.UserType = UserType.Passenger;
            user.Id = 0;
            user.Password = Hash.Sha256Hash(user.Password);

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
                response.User = user;

                return JsonResult(response);
            }
            else
            {
                return ErrorResult(5001, "User not found!");
            }
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        [JwtAuthorize]
        public IHttpActionResult GetUser(string id)
        {
            User user = unitOfWork.Users.GetUserByEmail(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}