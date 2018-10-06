using System;
using System.Collections.Generic;

namespace Project.DAL.Models
{
    public partial class UserDetails
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public string Email {get; set;}
       
    }
}
