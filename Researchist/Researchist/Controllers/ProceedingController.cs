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
    public class ProceedingController : Controller // Matijin kontroler
    {

        private BoltGraphClient client;
        public ProceedingController()
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
        [Route("GetProceedingInfo/{proceedingID}")]     // 2
        public async Task<IActionResult> GetProceedingInfo(int proceedingID)
        {
            var result = client.Cypher
                .Match("(pr:Proceeding)")
                .Where("id(pr)=" + proceedingID)
                .Return(pr => pr.As<Proceeding>())
                .ResultsAsync;


            return Ok(result.Result.FirstOrDefault());

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

            return Ok(new { People = people});

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

            return Ok(new { People = people });

        }

        [HttpGet]
        [Route("GetProceedingPapers/{proceedingID}")]
        public async Task<IActionResult> GetProceedingPapers(int proceedingID)
        {

            var result = client.Cypher
                .Match("(paper:Paper)-[:IS_PUBLISHED]->(proceeding:Proceeding)")
                .Where("id(proceeding)=" + proceedingID)
                .Return(paper => paper.As<Paper>());

            var lista = new List<Paper>();
            foreach (var paper in await result.ResultsAsync)
                lista.Add(paper);

            return Ok(new { Papers = lista });
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
        
    }
}
