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
    public class HomeController : Controller // Matijin kontroler
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

        private async void NormalizeIDs()
        {
            await client.Cypher.Match("(n)").Set("n.id=id(n)").ExecuteWithoutResultsAsync();
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

        [HttpGet]
        [Route("Search/{searchParam}")]
        public async Task<IActionResult> Search(string searchParam) // 1
        {
            var query1 = client.Cypher
                .Match("(p:Person)")
                .Where((Person p)=>p.Name.Contains(searchParam) || p.Surname.Contains(searchParam))
                .Return(p => p.As<Person>());
            var people = new List<Person>();
            foreach (var person in await query1.ResultsAsync)
                people.Add(person);

            var query2 = client.Cypher
                .Match("(p:Paper)")
                .Where((Paper p) => p.Title.Contains(searchParam))
                .Return(p => p.As<Paper>());
            var papers = new List<Paper>();
            foreach(var paper in await query2.ResultsAsync)
                papers.Add(paper);

            return Ok(new {People=people,Papers=papers});

        }

        [HttpGet]
        [Route("GetPersonCategories/{personID}")]
        public async Task<IActionResult> GetPersonCategories(int personID) // 2
        {
            var query1 = client.Cypher
                .Match("(pr:Person)-[r1:WRITES]->(pp:Paper)-[r2:HAS]->(c:Category)")
                .Where("id(pr)=" + personID)
                .Return(c => c.As<Category>());
            var categories = new List<Category>();
            foreach (var cat in await query1.ResultsAsync)
                categories.Add(cat);

            return Ok(categories);

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
