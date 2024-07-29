using AltayStok.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StockManagementAPI.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace StockManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly StokV8Context _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;

        public AuthController(StokV8Context context, IConfiguration configuration, ILogger<AuthController> logger)
            
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] CreateUserDto createUserDto)
        {
            try
            {
                if (string.IsNullOrEmpty(createUserDto.Username) || string.IsNullOrEmpty(createUserDto.Password) || string.IsNullOrEmpty(createUserDto.Role))
                {
                    return BadRequest("Username, password, and role are required.");
                }

                
                var salt = RandomNumberGenerator.GetBytes(16);
                var user = new User
                {
                    Username = createUserDto.Username,
                    Role = createUserDto.Role,
                    Salt = salt
                };

                // Hash password
                var hash = HashPassword(createUserDto.Password, salt);
                user.PasswordHash = hash;

                _context.Users.Add(user);
                _context.SaveChanges();

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating user.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginUserDto loginUserDto)
        {
            try
            {
                var user = _context.Users.SingleOrDefault(u => u.Username == loginUserDto.Username);

                if (user == null || !VerifyPassword(loginUserDto.Password, user.PasswordHash, user.Salt))
                {
                    return Unauthorized("Invalid username or password.");
                }

                var token = GenerateJwtToken(user);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error logging in.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost("updatePassword")]
        public IActionResult UpdatePassword([FromBody] UpdatePasswordDto updatePasswordDto)
        {
            try
            {
                var user = _context.Users.Find(updatePasswordDto.UserId);
                if (user == null)
                {
                    return NotFound("User not found.");
                }

                var newSalt = RandomNumberGenerator.GetBytes(16);
                var newHash = HashPassword(updatePasswordDto.NewPassword, newSalt);

                user.PasswordHash = newHash;
                user.Salt = newSalt;

                _context.SaveChanges();

                return Ok("Password updated successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating password.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            var users = _context.Users.Select(u => new
            {
                u.Id,
                u.Username,
                u.Role
            }).ToList();

            return Ok(users);
        }

        [HttpDelete("deleteUser/{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return NoContent();
        }

        private byte[] HashPassword(string password, byte[] salt)
        {
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 35000, HashAlgorithmName.SHA512);
            return pbkdf2.GetBytes(32); // Key size 32 bytes (256 bits)
        }

        private bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt)
        {
            var hash = HashPassword(password, storedSalt);
            _logger.LogInformation($"Input Password Hash: {Convert.ToHexString(hash)}");
            _logger.LogInformation($"Stored Password Hash: {Convert.ToHexString(storedHash)}");
            return hash.SequenceEqual(storedHash);
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiryMinutes"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
