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
        [Route("AddPerson/{name}/{surname}/{role}/{institution}/{contact}/{profilePicture}")]
        public async Task<IActionResult> AddPerson(string name, string surname, PersonRole role, string institution, string contact,string profilePicture)
        {
            var result= client.Cypher
                .Create("(person:Person {name: '" + name + "', surname: '" + surname +
                "', role: '" + role + "', institution: '" + institution + "', contact: '" + contact + "', profilePicture: '" + profilePicture + "'})")
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
                .Return(person => person.As<Person>());

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
