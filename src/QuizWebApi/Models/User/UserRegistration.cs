using System;

namespace QuizWebApi.Models.User
{
    public class UserRegistration : Status
    {
        public string DocumentType { get; set; }
        public string TeamName { get; set; }
        public string Email { get; set; }
        public string Email2 { get; set; }
        public string Email3 { get; set; }
        public string ContestantName { get; set; }
        public string ContestantName2 { get; set; }
        public string ContestantName3 { get; set; }
        public string Phone { get; set; }
        public string Phone2 { get; set; }
        public string Phone3 { get; set; }
        public string Contact { get; set; }
        public string QuizName { get; set; }
        public string QuizType { get; set; }
        public DateTime RegisteredOn { get; set; }
    }
}
