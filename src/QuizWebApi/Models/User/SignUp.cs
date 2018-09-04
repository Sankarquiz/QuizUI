using System;

namespace QuizWebApi.Models.User
{
    public class SignUp : Status
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Status { get; set; }
        public string Role { get; set; }
        public string Source { get; set; }
        public string DocumentType { get; set; }
        public DateTime CreatedDate { get; set; }
        public int StatusCode { get; set; }
        public string Url { get; set; }
        public string Message { get; set; }

        public SignUp()
        {
            Init();
        }
        private void Init()
        {
            DocumentType = "user";
            CreatedDate = DateTime.Now;
            Status = "Activation Pending";
            StatusCode = 0;
            Source = string.Empty;
            Message = string.Empty;
        }

        public SignUp(string error)
        {
            Init();
            Message = error;
        }
    }
}
