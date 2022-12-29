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
    public class CategoryController : Controller // Djoletov kontroler
    {
        public enum PersonRole
        {
            Professor,
            Student,
            Other
        }

        private BoltGraphClient client;
        public CategoryController()
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
        [Route("GetCategoryPapers")]
        public async Task<IActionResult> GetCategoryPapers([FromQuery] int[] categoryIDs) // 10
        {
            string whereParams = "";
            for (int i = 0; i < categoryIDs.Length; i++)
            {
                whereParams += "id(c)=" + categoryIDs[i];
                if (i != categoryIDs.Length - 1)
                    whereParams += " OR ";
            }
            var query1 = client.Cypher
                .Match("(p:Paper)-[r:HAS]->(c:Category)")
                .Where(whereParams)
                .ReturnDistinct(p => p.As<Paper>());
            var papers = new List<Paper>();
            foreach (var paper in await query1.ResultsAsync)
                papers.Add(paper);

            return Ok(papers);

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

        [HttpGet]
        [Route("GetPapersFromCategory/{categoryID}")]
        public async Task<IActionResult> GetPapersFromCategory(int categoryID)
        {

            var result = client.Cypher
                .Match("(paper:Paper)-[:HAS]->(category:Category)")
                .Where("id(category)=" + categoryID)
                .Return(paper => paper.As<Paper>());

            var lista = new List<Paper>();
            foreach (var paper in await result.ResultsAsync)
                lista.Add(paper);

            return Ok(lista);
        }

        [HttpGet]
        [Route("GetPeopleFromCategory/{categoryID}")]
        public async Task<IActionResult> GetPeopleFromCategory(int categoryID)
        {

            var result = client.Cypher
                .Match("(person:Person)-[:WRITES]->(paper:Paper)-[:HAS]->(category:Category)")
                .Where("id(category)=" + categoryID)
                .ReturnDistinct(person => person.As<Person>());

            var lista = new List<Person>();
            foreach (var person in await result.ResultsAsync)
                lista.Add(person);

            return Ok(lista);
        }

        [HttpGet]
        [Route("GetCategoryName/{categoryID}")]
        public async Task<IActionResult> GetCategoryName(int categoryID)
        {

            var result = client.Cypher
                .Match("(category:Category)")
                .Where("id(category)=" + categoryID)
                .Return(category => category.As<Category>())
                .ResultsAsync;


            return Ok(result.Result.FirstOrDefault());

        }
    }
}