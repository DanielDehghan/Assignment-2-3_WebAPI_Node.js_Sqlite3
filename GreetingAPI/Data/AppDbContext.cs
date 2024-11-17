using Microsoft.EntityFrameworkCore;
using GreetingAPI.Models;

namespace GreetingAPI.Data
{

 public class AppDbContext :DbContext
 {
  public AppDbContext(DbContextOptions<AppDbContext> options): base(options){}

  public DbSet<Greeting> Greetings { get; set; }
 }

}