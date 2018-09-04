using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizWebApi.Models.User
{
    public class UserProfile
    {
        public string Image { get; set; }
        public string Url { get; set; }
        public string Message { get; set; }

        public UserProfile()
        {

        }
        public UserProfile(string img,string url)
        {
            this.Image = img;
            this.Url = url;
            this.Message = string.Empty;
        }
        public UserProfile(string message)
        {
            this.Message = message;
        }
    }
}
