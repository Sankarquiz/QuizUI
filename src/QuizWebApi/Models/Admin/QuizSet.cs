namespace QuizWebApi.Models.Admin
{
    public class QuizSet
    {
        public string DocumentType { get; set; }
        public string QuizName { get; set; }
        public string QuizType { get; set; }
        public int QuestionNo { get; set; }
        public string QuestionText { get; set; }
        public string IsImageneeded { get; set; }
        public string ImageUrl { get; set; }
        public string AnswerType { get; set; }
        public string Answer { get; set; }
        public string Score { get; set; }
        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }
    }
}
