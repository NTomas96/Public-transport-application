using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.Models;
using Backend.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace Backend.Controllers
{
    public class UsersController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public UsersController(IUnitOfWork u)
        {
            this.unitOfWork = u;
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        [HttpPost]
        public IHttpActionResult RegisterUser(User user)
        {
            user.UserType = UserType.Passenger;
            user.Id = 0;

            unitOfWork.Users.Add(user);
            unitOfWork.Complete();


            return Ok(user);
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
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