
namespace GreetingAPI.Models
{
public class GreetingRequest{

public string TimeOfDay {get; set;}
public string Language {get; set;}
public string Tone {get; set;} = "Formal";
}

}