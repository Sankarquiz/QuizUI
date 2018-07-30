namespace QuizWebApi.Models.Admin
{
    public class RegistrationFields
    {
        public bool TeamName { get; set; }
        public bool EmailId { get; set; }
        public bool ValidateEmailIdForCorporate { get; set; }
        public bool ContestantName { get; set; }
        public bool PhoneNumber { get; set; }
        public bool ContactAddress { get; set; }
        public string RulesAndRegulations { get; set; }
    }
}
