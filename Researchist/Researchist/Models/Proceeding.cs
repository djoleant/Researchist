using Newtonsoft.Json;

namespace Researchist.Models
{
    public class Proceeding
    {
        [JsonProperty("id")]
        public int ID { get; set; }
        
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("year")]
        public int Year { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }
    }
}
