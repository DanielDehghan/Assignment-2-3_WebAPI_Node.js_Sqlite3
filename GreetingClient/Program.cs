using System.Collections.Generic;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using GreetingClient;

namespace GreetingClient
{
    class Program
    {

        static async Task Main(string[] args)
        {

            // Setup HttpClient
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:5105/api/Greeting/");

            // Fetch available times of day
            var timesOfDay = await client.GetFromJsonAsync<IEnumerable<string>>("GetAllTimesOfDay");
            Console.WriteLine("Available Times of Day:");
            foreach (var time in timesOfDay)
            {
                Console.WriteLine($"- {time}");
            };

            // Fetch supported languages
            var languages = await client.GetFromJsonAsync<IEnumerable<string>>("GetSupportedLanguages");
            Console.WriteLine("\nSupported Languages:");
            foreach (var lang in languages)
            {
                Console.WriteLine($"- {lang}");
            };

            // Get user input
            Console.WriteLine("\nEnter a time of day (e.g., Morning, Evening or Afternoon) or type 'exit' to quit:");
            string timeOfDay = Console.ReadLine();
            Console.WriteLine("Enter a language (e.g., English, Spanish or French) or type 'exit' to quit:");
            string language = Console.ReadLine();

            Console.Write("Enter Tone (Formal/Casual) or type 'exit' to quit: ");
            var tone = Console.ReadLine();

            // Create request object
            var request = new
            {
                TimeOfDay = timeOfDay,
                Language = language,
                Tone = tone
            };

            // Send POST request to Greet endpoint
            var response = await client.PostAsJsonAsync("Greet", request);
            if (response.IsSuccessStatusCode)
            {
                var greetingResponse = await response.Content.ReadFromJsonAsync<GreetingResponse>();
                Console.WriteLine($"\nGreeting: {greetingResponse.Message}");
            }
            else
            {
                Console.WriteLine("Invalid input, please try again.");
            }
        }

    }
}


