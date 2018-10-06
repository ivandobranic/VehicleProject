using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Linq;
using System.Threading.Tasks;
using Project.DAL.Models;
using Project.Repository.Common;
using System.Collections;
using System;
using System.Security.Cryptography;
using System.Text;

namespace Project.Repository
{
    public class UserDetailsRepository : IUserDetailsRepository
    {

        private readonly VehicleContext Context;
        private DbSet<UserDetails> Entities;
        public UserDetailsRepository(VehicleContext context)
        {
            Context = context;
            Entities = Context.Set<UserDetails>();

        }

            public async Task<UserDetails> Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = await Entities.SingleOrDefaultAsync(x => x.Username == username);

            if (user == null)

            if (!VerifyPasswordHash(password, user.PasswordHash))
                return null;

            return user;
        }

        public async Task<IList> GetAllAsync()
        {
            return await Entities.ToListAsync();
        }

        public async Task<UserDetails> GetByIdAsync(int id)
        {
            return await Entities.FindAsync(id);
        }

        public async Task<UserDetails> GetAdminDetails(string name)
        {
            return await Entities.FirstAsync(x => x.Username == name);
        }
        public async Task<UserDetails> InsertAsync(UserDetails model, string password)
        {
            if (await Entities.AnyAsync(x => x.Username == model.Username))
            {
                throw new ArgumentException("Username: " + model.Username + " is already taken");
            }
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentNullException("Password is required");
            }

            byte[] passwordHash;
            CreatePasswordHash(password, out passwordHash);
            model.PasswordHash = passwordHash;
            await Context.AddAsync(model);
            await Context.SaveChangesAsync();
            return model;

        }

        public async Task<int> UpdateAsync(UserDetails model, string password = null)
        {
            var user = await Entities.FindAsync(model.Id);
            if (user == null)
            {
                throw new ArgumentNullException("User not found!");
            }
            if (model.Username != user.Username)
            {
                if (await Entities.AnyAsync(x => x.Username == model.Username))
                {
                     throw new ArgumentException("Username " + model.Username + " is already taken");
                }
            }

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Username = model.Username;

             if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash;
                CreatePasswordHash(password, out passwordHash);

                user.PasswordHash = passwordHash;
            }

            Context.Entry(user).State = EntityState.Modified;
            return await Context.SaveChangesAsync();
        }

         public async Task<int> DeleteAsync(int id)
        {
            var entity = await Entities.FindAsync(id);
            Context.Entry(entity).State = EntityState.Deleted;
            return await Context.SaveChangesAsync();
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new HMACSHA512())
            {
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

          private static bool VerifyPasswordHash(string password, byte[] storedHash)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
    
            using (var hmac = new HMACSHA512(storedHash))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) 
                    return false;
                }
            }

            return true;
        }
       

    }
}