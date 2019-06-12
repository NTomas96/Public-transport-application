using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class ProductRepository : Repository<Product, int>, IProductRepository
    {
        protected ApplicationDbContext appDbContext { get { return context as ApplicationDbContext; } }

        public ProductRepository(DbContext context):base(context)
        {

        }

        public IEnumerable<Product> GetAllProducts(int pageIndex, int pageSize)
        {
            return appDbContext.Products.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }
    }
}