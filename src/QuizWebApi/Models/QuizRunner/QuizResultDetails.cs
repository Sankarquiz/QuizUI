using QuizWebApi.Models.Admin;

namespace QuizWebApi.Models.QuizRunner
{
    public class QuizResultDetails
    {
        public QuizResultDetails()
        {
            QuestionSet = new QuizSet();
        }
        public QuizSet QuestionSet { get; set; }
        public string UserAnswer { get; set; }
        public int AdminScore { get; set; }
        public int UserScored { get; set; }
    }
}
