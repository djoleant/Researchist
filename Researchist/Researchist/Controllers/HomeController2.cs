using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using Neo4jClient.Cypher;

using System.Xml.Linq;
using System.Collections;
using Researchist.Models;
using System.Collections.Generic;

namespace Researchist.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController2 : Controller // Djoletov kontroler
    {
        public enum PersonRole
        {
            Professor,
            Student,
            Other
        }

        private BoltGraphClient client;
        public HomeController2()
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
            await client.Cypher
                .Create("(person:Person {name: '" + name + "', surname: '" + surname +
                "', role: '"+role+"', institution: '"+institution+"', contact: '"+contact+"'})")
                // .WithParams(new {name, surname, role, institution, contact})
                .ExecuteWithoutResultsAsync();

                NormalizeIDs();
                return Ok();
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
        [Route("GetPapers/{proceeding}")]
        public async Task<IActionResult> GetPapers(string proceeding)
        {


            var result = client.Cypher
                .Match("(paper:Paper)-[:IS_PUBLISHED]->(proceeding:Proceeding)")
                .Return(paper => paper.As<Paper>());

            var lista = new List<Paper>();
            foreach (var paper in await result.ResultsAsync)
                lista.Add(paper);

            return Ok(lista);


        }
        
        [HttpGet]
        [Route("GetPapersFromProceeding/{proceedingID}")]
        public async Task<IActionResult> GetPapersFromProceeding(int proceedingID)
        {

            var result = client.Cypher
                .Match("(paper:Paper)-[:IS_PUBLISHED]->(proceeding:Proceeding)")
                .Where("id(proceeding)=" + proceedingID)
                .Return(paper => paper.As<Paper>());

            var lista = new List<Paper>();
            foreach (var paper in await result.ResultsAsync)
                lista.Add(paper);

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

        [HttpGet]
        [Route("GetCategories")]
        public async Task<IActionResult> GetCategories()
        {

            var result = client.Cypher
                .Match("(category:Category)")
                .Return(category => category.As<Category>());

            var lista = new List<Category>();
            foreach (var category in await result.ResultsAsync)
                lista.Add(category);

            return Ok(lista);
        }

        [HttpDelete]
        [Route("DeletePaper/{paperID}")]
        public async Task<IActionResult> DeletePaper(int paperID)
        {

           var result = client.Cypher
                .Match("(paper:Paper)")
                .Where("id(paper)=" + paperID)
                .DetachDelete("paper")
                .ExecuteWithoutResultsAsync();

            return Ok();
        }



        // [HttpGet]
        // [Route("GetDetails/{paper_title}")]
        // public async Task<IActionResult> GetDetails(string paper_title)
        // {


        //     var result = client.Cypher
        //         .Match("(paper:Paper)")
        //         .Where((Paper paper) => paper.Title == paper_title)
        //         .Return(paper => paper.As<Paper>())
        //         .ResultsAsync;


        //     return Ok(result.Result.FirstOrDefault());

        // }


        [HttpGet]
        [Route("GetDetails/{paperID}")]
        public async Task<IActionResult> GetDetails(int paperID)
        {


            var result = client.Cypher
                .Match("(paper:Paper)")
                .Where("id(paper)=" + paperID)
                .Return(paper => paper.As<Paper>())
                .ResultsAsync;


            return Ok(result.Result.FirstOrDefault());



        }

    }
}
