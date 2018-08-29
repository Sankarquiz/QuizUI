using System.Collections.Generic;

namespace QuizWebApi.Models.Admin
{
    public class QuizQuestions: Status
    {
        public QuizQuestions()
        {
            Questions = new List<QuizSet>();
        }
        public string DocumentType { get; set; }
        public string QuizName { get; set; }
        public string QuizType { get; set; }
        public List<QuizSet> Questions { get; set; }
    }
}
