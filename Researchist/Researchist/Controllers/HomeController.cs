using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using Neo4jClient.Cypher;

using System.Xml.Linq;
using System.Collections;
using Researchist.Models;

namespace Researchist.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Controller
    {

        private BoltGraphClient client;
        public HomeController()
        {

            client = new BoltGraphClient("bolt://localhost:7687", "neo4j", "researchist");
            try
            {
                client.ConnectAsync().Wait();
            }
            catch (Exception exc)
            {
                
            }
        }

        [HttpPost]
        [Route("AddPerson/{name}/{surname}")]
        public async Task<IActionResult> AddPerson(string name, string surname)
        {
            await client.Cypher.Create("(person:Person {name:\"" + name + "\",surname:\"" + surname+"\"})")
                .ExecuteWithoutResultsAsync();
            return Ok();

        }

        [HttpGet]
        [Route("GetPeople")]
        public async Task<IActionResult> GetPeople()
        {
            var query = client.Cypher
                .Match("(p:Person)")
                .Return(p => p.As<Person>())
                .Limit(5);
            var lista = new List<Person>();
            foreach (var person in await query.ResultsAsync)
                lista.Add(person);
            return Ok(lista);  

        }

        //[HttpPut]
        //[Route("UpdatePerson/{id}/{name}/{surname}")]
        //public async Task<IActionResult> UpdatePerson(int id, string name,string surname)
        //{
        //    await client.Cypher
        //        .Match("(n:Person)")
        //        .Where((Person n) => n.ID == id)
        //        .Set("n.name=\"" + name + "\",n.surname=\"" + surname + "\"")
        //        .ExecuteWithoutResultsAsync();
        //    return Ok();

        //}

        //[HttpDelete]
        //[Route("DeletePerson/{id}")]
        //public async Task<IActionResult> UpdatePerson(int id)
        //{
        //    await client.Cypher
        //        .Match("(n:Person)")
        //        .Where((Person n) => n.ID == id)
        //        .Delete("n")
        //        .ExecuteWithoutResultsAsync();
        //    return Ok();

        //}

    }
}
