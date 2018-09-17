using System;
using System.Collections.Generic;

namespace QuizWebApi.Models.QuizRunner
{
    public class QuizResult : Status
    {
        public QuizResult()
        {
            QuizResultDetails = new List<QuizResultDetails>();
        }
        public string DocumentType { get; set; }
        public string QuizName { get; set; }
        public string QuizType { get; set; }
        public string TeamName { get; set; }
        public string Email { get; set; }
        public int TotalScored { get; set; }
        public int TimeTakenMinutes { get; set; }
        public int TimeTakenSeconds { get; set; }
        public int NumberOfCorrectAnswers { get; set; }
        public int NumberOfWrongAnswers { get; set; }
        public DateTime QuizStartTime { get; set; }
        public int DurationInMinutes { get; set; }
        public int LastAnsweredQuestion { get; set; }
        public string Status { get; set; }
        public List<QuizResultDetails> QuizResultDetails { get; set; }

    }
    public enum QuizStatus
    {
        Started,
        Completed,
        Timeout,
        InComplete
    }
}