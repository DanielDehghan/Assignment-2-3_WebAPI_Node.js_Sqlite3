
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreetingAPI.Data;
using GreetingAPI.Models;

namespace GreetingAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class GreetingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GreetingController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("Greet")]
        public async Task<ActionResult<GreetingResponse>> Greet([FromBody] GreetingRequest request)
        {

            var greeting = await _context.Greetings.FirstOrDefaultAsync(g => g.TimeOfDay == request.TimeOfDay && g.Language == request.Language);

            if (greeting == null)
            {
                return NotFound(new { Message = "Greeting Not Found" });
            }

            // Dictionary for buddy translations
            var buddyTranslations = new Dictionary<string, string>
    {
        { "English", "buddy" },
        { "Spanish", "amigo" },
        { "French", "mon ami" }
    };

            string buddyTerm = buddyTranslations.ContainsKey(request.Language) ? buddyTranslations[request.Language] : "buddy";
            //Adjust Message based on a Tone 
            string message = request.Tone?.ToLower() == "casual"
            ? $"{greeting.GreetingMessage}, {buddyTerm}"
            : greeting.GreetingMessage;

            return Ok(new GreetingResponse { Message = message, Tone = request.Tone ?? "Formal" });
        }

        [HttpGet("GetAllTimesOfDay")]
        public async Task<ActionResult<IEnumerable<string>>> GetAllTimesOfDay()
        {
            var timesOfDay = await _context.Greetings.Select(g => g.TimeOfDay).Distinct().ToListAsync();
            return Ok(timesOfDay);
        }

        [HttpGet("GetSupportedLanguages")]
        public async Task<ActionResult<IEnumerable<string>>> GetSupportedLanguages()
        {
            var language = await _context.Greetings.Select(g => g.Language).Distinct().ToListAsync();
            return Ok(language);
        }

    }

}