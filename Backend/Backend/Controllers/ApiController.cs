using Backend.Models;
using Backend.Models.Web;
using Backend.Persistence.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    public class ApiController : ControllerBase
    {
        protected IActionResult Success<T>(T value)
        {
            var result = new JsonResult(new SuccessApiResponse<T>(value));
            result.StatusCode = 200;

            return result;
        }

        protected IActionResult Error(int errorCode, string errorMessage)
        {
            var result = new JsonResult(new ErrorApiResponse(errorCode, errorMessage));
            result.StatusCode = 400;

            return result;
        }

        protected int? GetUserId()
        {
            if (User == null) return null;

            int res;

            if (int.TryParse(User.Identity.Name, out res)) return res;

            return null;
        }

        protected User GetUser(IUnitOfWork unitOfWork)
        {
            int? id = GetUserId();

            if (!id.HasValue) return null;

            return unitOfWork.Users.Get(id.Value);
        }
    }
}
