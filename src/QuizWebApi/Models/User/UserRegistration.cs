﻿namespace QuizWebApi.Models.User
{
    public class UserRegistration
    {
        public string TeamName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ContestantName { get; set; }
        public string Phone { get; set; }
        public string Contact { get; set; }
        public string Role { get; set; }
        public string quizName { get; set; }
        public string quizType { get; set; }
    }
}
