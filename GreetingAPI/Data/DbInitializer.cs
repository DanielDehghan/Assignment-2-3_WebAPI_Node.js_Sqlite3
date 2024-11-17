using GreetingAPI.Models;

namespace GreetingAPI.Data
{
    public static class DbInitializer{
        
        public static void Initialize(AppDbContext context)
        {
            if(context.Greetings.Any())
            return;
         
         var greetings = new Greeting[]
         {
          // Morning greetings
                new Greeting { TimeOfDay = "Morning", Language = "English", GreetingMessage = "Good Morning" },
                new Greeting { TimeOfDay = "Morning", Language = "French", GreetingMessage = "Bonjour" },
                new Greeting { TimeOfDay = "Morning", Language = "Spanish", GreetingMessage = "Buenos Días" },

                // Afternoon greetings
                new Greeting { TimeOfDay = "Afternoon", Language = "English", GreetingMessage = "Good Afternoon" },
                new Greeting { TimeOfDay = "Afternoon", Language = "French", GreetingMessage = "Bon Après-midi" },
                new Greeting { TimeOfDay = "Afternoon", Language = "Spanish", GreetingMessage = "Buenas Tardes" },

                // Evening greetings
                new Greeting { TimeOfDay = "Evening", Language = "English", GreetingMessage = "Good Evening" },
                new Greeting { TimeOfDay = "Evening", Language = "French", GreetingMessage = "Bonsoir" },
                new Greeting { TimeOfDay = "Evening", Language = "Spanish", GreetingMessage = "Buenas Noches" }
         };

        context.Greetings.AddRange(greetings);
        context.SaveChanges();

        }

    }
}