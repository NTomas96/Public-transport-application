using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Persistence.Repository
{
    public interface IUserRepository : IRepository<User,int>
    {
        User GetUserByEmail(string email);
        User GetUserById(int id);
        IQueryable<User> GetUnverifiedUsers();
    }
}
