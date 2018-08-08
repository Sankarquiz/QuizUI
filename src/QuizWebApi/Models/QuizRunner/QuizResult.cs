using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizWebApi.Models.QuizRunner
{
    public class QuizResult
    {
        public QuizResult()
        {
            QuizResultDetails = new List<QuizResultDetails>();
        }
        public string QuizName { get; set; }
        public string QuizType { get; set; }
        public string TeamName { get; set; }
        public int TotalScored { get; set; }
        public int NumberOfCorrectAnswers { get; set; }
        public int NumberOfWrongAnswers { get; set; }
        public List<QuizResultDetails> QuizResultDetails { get; set; }
    }
}