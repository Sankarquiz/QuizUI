using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizWebApi.Models.QuizRunner
{
    public class QuizResultDetails
    {
        public int questionNo { get; set; }
        public string questionText { get; set; }
        public string answerType { get; set; }
        public string adminAnswer { get; set; }
        public string userAnswer { get; set; }
        public int adminScore { get; set; }
        public int userScored { get; set; }
    }
}
