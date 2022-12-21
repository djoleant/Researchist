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
        [Route("GetDetails/{paper_title}")]
        public async Task<IActionResult> GetDetails(string paper_title)
        {


            var result = client.Cypher
                .Match("(paper:Paper)")
                .Where((Paper paper) => paper.Title == paper_title)
                .Return(paper => paper.As<Paper>())
                .ResultsAsync;


            return Ok(result.Result.FirstOrDefault());


        }


    }
}
