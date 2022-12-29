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
    public class PersonController : Controller // Matijin kontroler
    {
        private async void NormalizeIDs()
        {
            await client.Cypher.Match("(n)").Set("n.id=id(n)").ExecuteWithoutResultsAsync();
        }

        private BoltGraphClient client;
        public PersonController()
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

        [HttpPut]
        [Route("UpdatePersonPhoto/{id}/{link}")]
        public async Task<IActionResult> UpdatePersonPhoto(int id, string link) // 7
        {
            await client.Cypher
                .Match("(n:Person)")
                .Where("id(n)=" + id)
                .Set("n.profilePicture=$link")
                .WithParams(new { id, link })
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
        [Route("GetAllPeople")]
        public async Task<IActionResult> GetAllPeople()
        {
            var query = client.Cypher
                .Match("(p:Person)")
                .Return(p => p.As<Person>());
            var lista = new List<object>();
            foreach (var person in await query.ResultsAsync)
                lista.Add(new { person.ID, Name = person.Name + " " + person.Surname });
            return Ok(lista);

        }

        // ---

        [HttpGet]
        [Route("GetPersonInfo/{personID}")]     // 2
        public async Task<IActionResult> GetPersonInfo(int personID)
        {
            var result = client.Cypher
                .Match("(pr:Person)")
                .Where("id(pr)=" + personID)
                .Return(pr => pr.As<Person>())
                .ResultsAsync;


            return Ok(result.Result.FirstOrDefault());

        }


        [HttpGet]
        [Route("GetPersonCoauthors/{personID}")]   // 5
        public async Task<IActionResult> GetPersonCoauthors(int personID)
        {
            var result = client.Cypher
                .Match("(pr:Person)-[r1:WRITES]->(pp:Paper)")
                .Where("id(pr)=" + personID)
                .Return(pp => pp.As<Paper>());
            var people = new List<Person>();

            NormalizeIDs();
            foreach (var p in await result.ResultsAsync)
            {
                var result2 = client.Cypher
                .Match("(pr:Person)-[r1:WRITES]->(pp:Paper)")
                .Where("id(pp)=" + p.ID)
                //.Where("id(pr)<>" + personID)
                .Return(pr => pr.As<Person>());

                foreach (var pp in await result2.ResultsAsync)
                    people.Add(pp);
            }
            people = people.Where(x => x.ID != personID).ToList();
            return Ok(people.Distinct());

        }

        // ---

        [HttpGet]
        [Route("GetPapers/{name}/{surname}")]
        public async Task<IActionResult> GetPapers(string name, string surname)
        {


            // NOTE: RADI kada se vraca kao STRING
            // NE RADI kad se vraca KAO OBJEKAT zbog DateOnly
            // RESI PROBLEM


            var result = client.Cypher
                .Match("(person:Person)-[:WRITES]->(paper:Paper)")
                .Where((Person person) => person.Name == name)
                .AndWhere((Person person) => person.Surname == surname)
                .Return(paper => paper.As<Paper>());

            var lista = new List<Paper>();
            foreach (var paper in await result.ResultsAsync)
                lista.Add(paper);

            return Ok(lista);


        }

        [HttpGet]
        [Route("GetProceedings/{name}/{surname}")]
        public async Task<IActionResult> GetProceedings(string name, string surname)
        {


            var result = client.Cypher
                .Match("(person:Person)-[:WRITES]->(paper:Paper)-[:IS_PUBLISHED]->(proceeding:Proceeding)")
                .Where((Person person) => person.Name == name)
                .AndWhere((Person person) => person.Surname == surname)
                .Return(proceeding => proceeding.As<Proceeding>());

            var lista = new List<Proceeding>();
            foreach (var proceeding in await result.ResultsAsync)
                lista.Add(proceeding);

            return Ok(lista);


        }

        [HttpPost]
        [Route("AddPerson/{name}/{surname}/{role}/{institution}/{contact}")]
        public async Task<IActionResult> AddPerson(string name, string surname, PersonRole role, string institution, string contact)
        {
            var result = client.Cypher
                .Create("(person:Person {name: '" + name + "', surname: '" + surname +
                "', role: '" + role + "', institution: '" + institution + "', contact: '" + contact + "'})")
                .Set("person.id=id(person)")
                // .WithParams(new {name, surname, role, institution, contact})
                //.ExecuteWithoutResultsAsync();
                .Return(person => person.As<Person>());
            NormalizeIDs();
            var person = (await result.ResultsAsync).FirstOrDefault();
            return Ok(person);
        }


        [HttpGet]
        [Route("GetProceedings/{personID}")]
        public async Task<IActionResult> GetProceedings(int personID)
        {


            var result = client.Cypher
                .Match("(person:Person)-[:WRITES]->(paper:Paper)-[:IS_PUBLISHED]->(proceeding:Proceeding)")
                .Where("id(person)=" + personID)
                .Return(proceeding => proceeding.As<Proceeding>());

            var lista = new List<Proceeding>();
            foreach (var proceeding in await result.ResultsAsync)
                lista.Add(proceeding);

            return Ok(lista);


        }



        [HttpGet]
        [Route("GetPapersFromPerson/{personID}")]
        public async Task<IActionResult> GetPapersFromPerson(int personID)
        {

            var result = client.Cypher
                .Match("(person:Person)-[:WRITES]->(paper:Paper)")
                .Where("id(person)=" + personID)
                .Return(paper => paper.As<Paper>());

            var lista = new List<Paper>();
            foreach (var paper in await result.ResultsAsync)
                lista.Add(paper);

            return Ok(lista);
        }



    }
}
