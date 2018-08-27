﻿namespace QuizWebApi.Models.User
{
    public class SignUp: Status
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Status { get; set; }
        public string Role { get; set; }
    }
}