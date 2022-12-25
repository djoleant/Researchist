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
    public class RelationsController : Controller // Djoletov kontroler
    {

        private BoltGraphClient client;
        public RelationsController()
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


        // -----------------------------------------------
        // -------------CREATE RELATIONSHIPS--------------
        // -----------------------------------------------

        [HttpPost]
        [Route("References/{paper1ID}/{paper2ID}")]
        public async Task<IActionResult> References(int paper1ID, int paper2ID)
        {
            //(paper1)-[r:REFERENCES]->(paper2)
            await client.Cypher
                .Match("(paper1:Paper)", "(paper2:Paper)")
                .Where("id(paper1)=" + paper1ID)
                .AndWhere("id(paper2)=" + paper2ID)
                .Create("(paper1)-[r:REFERENCES]->(paper2)")
                .ExecuteWithoutResultsAsync();

                NormalizeIDs();
                return Ok();
        }

        [HttpPost]
        [Route("Reviews/{personID}/{paperID}")]
        public async Task<IActionResult> Reviews(int personID, int paperID)
        {
            //(person)-[r:REVIEWS]->(paper)
            await client.Cypher
                .Match("(person:Person)", "(paper:Paper)")
                .Where("id(person)=" + personID)
                .AndWhere("id(paper)=" + paperID)
                .Create("(person)-[r:REVIEWS]->(paper)")
                .ExecuteWithoutResultsAsync();

                NormalizeIDs();
                return Ok();
        }

        [HttpPost]
        [Route("Is_published/{paperID}/{proceedingID}")]
        public async Task<IActionResult> Is_published(int paperID, int proceedingID)
        {
            //(paper)-[r:IS_PUBLISHED]->(proceeding)
            await client.Cypher
                .Match("(paper:Paper)", "(proceeding:Proceeding)")
                .Where("id(paper)=" + paperID)
                .AndWhere("id(proceeding)=" + proceedingID)
                .Create("(paper)-[r:IS_PUBLISHED]->(proceeding)")
                .ExecuteWithoutResultsAsync();

                NormalizeIDs();
                return Ok();
        }

        [HttpPost]
        [Route("Writes/{personID}/{paperID}")]
        public async Task<IActionResult> Writes(int personID, int paperID)
        {
            //(person)-[r:WRITES]->(paper)
            await client.Cypher
                .Match("(person:Person)", "(paper:Paper)")
                .Where("id(person)=" + personID)
                .AndWhere("id(paper)=" + paperID)
                .Create("(person)-[r:WRITES]->(paper)")
                .ExecuteWithoutResultsAsync();

                NormalizeIDs();
                return Ok();
        }

        [HttpPost]
        [Route("Has/{paperID}/{categoryID}")]
        public async Task<IActionResult> Has(int paperID, int categoryID)
        {
            //(paper)-[r:HAS]->(category)
            await client.Cypher
                .Match("(paper:Paper)", "(category:Category)")
                .Where("id(paper)=" + paperID)
                .AndWhere("id(category)=" + categoryID)
                .Create("(paper)-[r:HAS]->(category)")
                .ExecuteWithoutResultsAsync();

                NormalizeIDs();
                return Ok();
        }


    }
}
