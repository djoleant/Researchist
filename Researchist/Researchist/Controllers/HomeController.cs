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


        [HttpGet]
        [Route("Search/{searchParam}")]
        public async Task<IActionResult> Search(string searchParam) // 1
        {
            var query1 = client.Cypher
                .Match("(p:Person)")
                .Where((Person p) => p.Name.Contains(searchParam) || p.Surname.Contains(searchParam) ||
                    searchParam.Contains(p.Name) || searchParam.Contains(p.Surname))
                .Return(p => p.As<Person>());
            var people = new List<Person>();
            foreach (var person in await query1.ResultsAsync)
                people.Add(person);

            var query2 = client.Cypher
                .Match("(p:Paper)")
                .Where((Paper p) => p.Title.Contains(searchParam))
                .Return(p => p.As<Paper>());
            var papers = new List<Paper>();
            foreach (var paper in await query2.ResultsAsync)
                papers.Add(paper);

            return Ok(new { People = people, Papers = papers });

        }

        [HttpGet]
        [Route("GetPersonCategories/{personID}")]
        public async Task<IActionResult> GetPersonCategories(int personID) // 4
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

        [HttpPut]
        [Route("UpdatePerson/{id}/{name}/{surname}/{contact}")]
        public async Task<IActionResult> UpdatePerson(int id, string name, string surname, string contact) // 7
        {
            await client.Cypher
                .Match("(n:Person)")
                .Where("id(n)=" + id)
                .Set("n.name=$name,n.surname=$surname,n.contact=$contact")
                .WithParams(new { id, name, surname, contact })
                .ExecuteWithoutResultsAsync();
            return Ok();

        }

        [HttpGet]
        [Route("GetCategoryPapers/{categoryID}")]
        public async Task<IActionResult> GetCategoryPapers(int categoryID) // 10
        {
            var query1 = client.Cypher
                .Match("(p:Paper)-[r:HAS]->(c:Category)")
                .Where("id(c)=$categoryID")
                .WithParams(new { categoryID })
                .Return(p => p.As<Paper>());
            var papers = new List<Paper>();
            foreach (var paper in await query1.ResultsAsync)
                papers.Add(paper);

            return Ok(papers);

        }

        [HttpGet]
        [Route("GetPaperAuthors/{paperID}")]
        public async Task<IActionResult> GetPaperAuthors(int paperID) // 13
        {
            var query1 = client.Cypher
                .Match("(pp:Paper)<-[r:WRITES]-(pr:Person)")
                .Where("id(pp)=$paperID")
                .WithParams(new { paperID })
                .Return(pr => pr.As<Person>());
            var authors = new List<Person>();
            foreach (var person in await query1.ResultsAsync)
                authors.Add(person);

            return Ok(authors);

        }

        [HttpPut]
        [Route("UpdatePaper/{id}/{title}/{description}")]
        public async Task<IActionResult> UpdatePaper(int id, string title, string description) // 16
        {
            await client.Cypher
                .Match("(n:Paper)")
                .Where("id(n)=$id")
                .Set("n.title=$title,n.description=$description")
                .WithParams(new { id, title, description })
                .ExecuteWithoutResultsAsync();
            return Ok();

        }

        [HttpGet]
        [Route("GetAllAuthors")]
        public async Task<IActionResult> GetAllAuthors() // 19
        {
            var query = client.Cypher
                .Match("(p:Person)-[r:WRITES]->(pp:Paper)")
                .Return(p => p.As<Person>());
            var lista = new List<Person>();
            foreach (var person in await query.ResultsAsync)
                lista.Add(person);
            return Ok(lista);

        }

        [HttpGet]
        [Route("GetPaperReviewers/{paperID}")]
        public async Task<IActionResult> GetPaperReviewers(int paperID) // 22
        {
            var query1 = client.Cypher
                .Match("(pp:Paper)<-[r:REVIEWS]-(pr:Person)")
                .Where("id(pp)=$paperID")
                .WithParams(new { paperID })
                .Return(pr => pr.As<Person>());
            var authors = new List<Person>();
            foreach (var person in await query1.ResultsAsync)
                authors.Add(person);

            return Ok(authors);

        }
    }
}
