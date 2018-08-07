namespace QuizWebApi.Models.Admin
{
    public class QuizSet
    {
        public int QuestionNo { get; set; }
        public string QuestionText { get; set; }
        public bool IsImageneeded { get; set; }
        public string ImageUrl { get; set; }
        public string AnswerType { get; set; }
        public string Answer { get; set; }
        public int Score { get; set; }
        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }
    }
}
