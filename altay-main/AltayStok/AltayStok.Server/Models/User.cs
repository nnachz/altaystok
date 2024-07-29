using AltayStok.Server.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AltayStok.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] Salt { get; set; } = Array.Empty<byte>();
        public string Role { get; set; } = string.Empty;
    }


}



