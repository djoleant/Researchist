using Microsoft.AspNetCore.Mvc;
using Neo4j.Driver;
using Neo4j;


namespace Researchist.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private readonly IDriver driver;

        public HomeController()
        {
            driver = GraphDatabase.Driver("bolt://localhost:7687", AuthTokens.Basic("neo4j", "researchist"));
        }

        [HttpPost]
        [Route("AddPerson/{name}/{surname}")]
        public async Task<IActionResult> AddPerson(string name, string surname)
        {
            string q = "CREATE (person:Person {name: $name,surname:$surname})";
            var statementParameters = new Dictionary<string, object>
            {
                {"name", name },
                {"surname", surname}
            };
            var session = driver.AsyncSession();
            if (session == null)
                return StatusCode(404, "Ovo samo stavljamo zbog VS, ali je doslo do greske");
            var result = await session.ExecuteWriteAsync(tx => tx.RunAsync(q, statementParameters));
            return StatusCode(201, "Node has been created in the database");
            
        }


    }
}
