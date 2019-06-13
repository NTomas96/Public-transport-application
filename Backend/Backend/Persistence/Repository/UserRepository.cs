﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Backend.Models;
using Backend.Persistence;

namespace WebApp.Persistence.Repository
{
    public class UserRepository : Repository<User, int>, IUserRepository
    {
        protected AppDbContext appDbContext { get { return context as AppDbContext; } }

        public UserRepository(DbContext context) : base(context)
        {

        }

        public User GetUserByEmail(string email)
        {
            return appDbContext.Users.Where(u => u.Email.Equals(email)).FirstOrDefault();
        }
    }
}