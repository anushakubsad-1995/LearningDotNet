using AngularAuthAPI.Context;
using AngularAuthAPI.Entity;
using AngularAuthAPI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularAuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly AppDbContext _context;
        public UserController(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        [HttpPost("authenticate")]

        public async Task<IActionResult> Authenticate([FromBody] Login login)
        {
            if (login == null)
            {
                return BadRequest();
            }

            var userObj = await _context.Users.FirstOrDefaultAsync(u => u.UserName == login.UserName && u.Password == login.Password);
            if (userObj == null)
            {
                return NotFound(new { Message = "User not found!" });
            }

            return Ok(new { Message = "Login Successful!" });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User user)
        {
            if (user == null) { return BadRequest(); }

            UserEntity userEntity = new UserEntity
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserName = user.UserName,
                Password = user.Password,
                Role = string.Empty,
                Token = string.Empty
            };
         
           await _context.Users.AddAsync(userEntity);
            await _context.SaveChangesAsync();

            return Ok(new {Message="User Registered"});

        }
    }
}
