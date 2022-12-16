using Newtonsoft.Json;

namespace Researchist.Models
{
    public enum PersonRole
    {
        Professor,
        Student,
        Other
    }
    public class Person
    {
        //[JsonProperty("id")]
        //public int ID { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("surname")]
        public string Surname { get; set; }

        [JsonProperty("role")]
        public PersonRole Role { get; set; }

        [JsonProperty("institution")]
        public string Institution { get; set; }

        [JsonProperty("contact")]
        public string Contact { get; set; }

        [JsonProperty("profilePicture")]
        public string ProfilePicture { get; set; }
    }
}
