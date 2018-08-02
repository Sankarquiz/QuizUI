namespace QuizWebApi.Models.Admin
{
    public class RegistrationFields
    {
        public bool IsTeamName { get; set; }
        public bool IsEmail { get; set; }
        public bool IsValidateEmail { get; set; }
        public bool IsContestantName { get; set; }
        public bool IsPhone { get; set; }
        public bool IsContact { get; set; }
        public string RulesAndRegulations { get; set; }
    }
}
