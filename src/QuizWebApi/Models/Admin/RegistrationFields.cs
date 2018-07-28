using MongoDB.Bson.Serialization.Attributes;

namespace QuizWebApi.Models.Admin
{
    public class RegistrationFields
    {
        [BsonElement]
        public bool TeamName { get; set; }
        [BsonElement]
        public bool EmailId { get; set; }
        [BsonElement]
        public bool ValidateEmailIdForCorporate { get; set; }
        [BsonElement]
        public bool ContestantName { get; set; }
        [BsonElement]
        public bool PhoneNumber { get; set; }
        [BsonElement]
        public bool ContactAddress { get; set; }
    }
}
