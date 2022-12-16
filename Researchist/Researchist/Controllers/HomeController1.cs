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

        

    }
}
