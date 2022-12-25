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
    public class PaperController : Controller // Djoletov kontroler
    {
        public enum PersonRole
        {
            Professor,
            Student,
            Other
        }

        private BoltGraphClient client;
        public PaperController()
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

            return Ok(new { People = authors });

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

            return Ok(new { People = authors });

        }


        [HttpPost]
        [Route("AddPaper/{title}/{description}/{date}/{link}")]   // 17
        public async Task<IActionResult> AddPaper(string title, string description, DateTime date, string link)
        {
            var result = client.Cypher
                .Create("(paper:Paper {title:\"" + title + "\",description:\"" + description + "\",date:\"" + date + "\",link:\"" + link + "\"})")
                //.ExecuteWithoutResultsAsync();
                .Set("paper.id=id(paper)")
                .Return(paper => paper.As<Paper>());

            var paper = (await result.ResultsAsync).FirstOrDefault();

            NormalizeIDs();
            return Ok(paper);

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

            return Ok(new { Papers = refpapers });

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

            return Ok(new { Papers = refpapers });

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