using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Product")]
    public class ProductController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public ProductController(IUnitOfWork u)
        {
            this.unitOfWork = u;
        }

        [Route("PostProduct")]
        public IHttpActionResult PostProduct(ProductBindingModel prodBM)
        {
            var prod = new Product() { Desc = prodBM.Desc };

            unitOfWork.Products.Add(prod);
            unitOfWork.Complete();

            return Ok();
        }
    }
}
