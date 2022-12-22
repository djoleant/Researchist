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
    public class HomeController1 : Controller // Emin kontroler
    {

        private BoltGraphClient client;
        public HomeController1()
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

        [HttpPost]
        [Route("AddPaper/{title}/{description}/{date}/{link}")]   // 17
        public async Task<IActionResult> AddPaper(string title, string description, DateTime date, string link)
        {
            await client.Cypher.Create("(paper:Paper {title:\"" + title + "\",description:\"" + description + "\",date:\"" + date + "\",link:\"" + link + "\"})")
                .ExecuteWithoutResultsAsync();
            return Ok();

        }

        [HttpGet]
        [Route("GetCategoryPeople/{categoryID}")]   // 11
        public async Task<IActionResult> GetCategoryPeople(int categoryID) 
        {
            var result = client.Cypher
                .Match("(pr:Person)-[r1:WRITES]->(pp:Paper)-[r2:HAS]->(c:Category)")
                .Where("id(c)=" + categoryID)
                .Return(pr => pr.As<Person>());
            var people = new List<Person>();
            foreach (var p in await result.ResultsAsync)
                people.Add(p);

            return Ok(people);

        }

        [HttpGet]
        [Route("GetPaperReferences1/{paperID}")]   // 14 - vraca sve radove koji referenciraju rad sa id-jem paperID 
        public async Task<IActionResult> GetPaperReferences1(int paperID)
        {
            var result = client.Cypher
                .Match("(po:Paper)-[r1:REFERENCES]->(pr:Paper)")
                .Where("id(pr)=" + paperID)
                .Return(po => po.As<Paper>());
            var refpapers = new List<Paper>();
            foreach (var p in await result.ResultsAsync)
                refpapers.Add(p);

            return Ok(refpapers);

        }

        [HttpGet]
        [Route("GetPaperReferences2/{paperID}")]   // 14 - vraca sve radove koje rad sa id-jem paperID referencira
        public async Task<IActionResult> GetPaperReferences2(int paperID)
        {
            var result = client.Cypher
                .Match("(po:Paper)-[r1:REFERENCES]->(pr:Paper)")
                .Where("id(po)=" + paperID)
                .Return(pr => pr.As<Paper>());
            var refpapers = new List<Paper>();
            foreach (var p in await result.ResultsAsync)
                refpapers.Add(p);

            return Ok(refpapers);

        }

        [HttpGet]
        [Route("GetCategoryProceedings/{categoryID}")]   // 20 
        public async Task<IActionResult> GetCategoryProceedings(int categoryID)
        {
            var result = client.Cypher
                .Match("(pp:Paper)-[r1:HAS]->(c:Category)")
                .Where("id(c)=" + categoryID)
                .Match("(pp:Paper)-[r2:IS_PUBLISHED]->(pr:Proceeding)")
                .Return(pr => pr.As<Proceeding>());
            var proceedings = new List<Proceeding>();
            foreach (var p in await result.ResultsAsync)
                proceedings.Add(p);

            return Ok(proceedings);

        }

        [HttpGet]
        [Route("GetProceedingPeople/{proceedingID}")]   // 8
        public async Task<IActionResult> GetProceedingPeople(int proceedingID)
        {
            var result = client.Cypher
                .Match("(pr:Person)-[r1:WRITES]->(pp:Paper)-[r2:IS_PUBLISHED]->(pc:Proceeding)")
                .Where("id(pc)=" + proceedingID)
                .Return(pr => pr.As<Person>());
            var people = new List<Person>();
            foreach (var p in await result.ResultsAsync)
                people.Add(p);

            return Ok(people);

        }

        [HttpGet]
        [Route("GetProceedingReviewers/{proceedingID}")]   // 23
        public async Task<IActionResult> GetProceedingReviewers(int proceedingID)
        {
            var result = client.Cypher
                .Match("(pr:Person)-[r1:REVIEWS]->(pp:Paper)-[r2:IS_PUBLISHED]->(pc:Proceeding)")
                .Where("id(pc)=" + proceedingID)
                .Return(pr => pr.As<Person>());
            var people = new List<Person>();
            foreach (var p in await result.ResultsAsync)
                people.Add(p);

            return Ok(people);

        }

    }
}
