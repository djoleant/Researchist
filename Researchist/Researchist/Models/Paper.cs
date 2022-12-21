using Newtonsoft.Json;

namespace Researchist.Models
{
    public class Paper
    {
        //public int ID { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("date")]
        public DateTime Date { get; set; }

        [JsonProperty("link")]
        public string Link { get; set; }

    }
}
