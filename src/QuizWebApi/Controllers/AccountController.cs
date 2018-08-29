using Couchbase.N1QL;
using Microsoft.AspNetCore.Mvc;
using QuizWebApi.Models.User;
using QuizWebApi.Utilities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizWebApi.Controllers
{
    [Route("api/quiz/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public EmailManager _email { get; }
        public AccountController(EmailManager email)
        {
            _email = email;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody]UserRegistration user)
        {
            var query = string.Format(@"SELECT {0}.* FROM {0} WHERE documentType=""{1}"" and quizName=""{3}"" and (email=""{2}"" or email2=""{2}"" or email3=""{2}"") ",
                            CouchbaseHelper.Bucket, "Register", user.Email, user.QuizName);
            var req = new QueryRequest(query);
            var res = await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<UserRegistration>(req);
            if (res.Count > 0)
            {
                return Ok("You have already registered for this quiz with team " + res.First().TeamName);
            }

            query = string.Format(@"SELECT {0}.* FROM {0} WHERE documentType=""{1}"" and quizName=""{2}"" and quizType=""{3}"" and teamName=""{4}"" ",
                         CouchbaseHelper.Bucket, "Register", user.QuizName, user.QuizType, user.TeamName);
            req = new QueryRequest(query);
            res = await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<UserRegistration>(req);
            if (res.Count > 0)
            {
                return Ok(user.TeamName + " is already registered for this quiz.Please try with different name.");
            }

            user.DocumentType = "Register";
            var result = await CouchbaseHelper.CouchbaseClient.UpsertAsync(user.Email + user.QuizName, user);
            _email.RegisterQuiz(user.ContestantName, user.ContestantName, user.TeamName, user.QuizName, user.Email);
            if (!string.IsNullOrWhiteSpace(user.Email2))
            {
                _email.RegisterQuiz(user.ContestantName, user.ContestantName2, user.TeamName, user.QuizName, user.Email2);
            }
            if (!string.IsNullOrWhiteSpace(user.Email3))
            {
                _email.RegisterQuiz(user.ContestantName, user.ContestantName3, user.TeamName, user.QuizName, user.Email3);
            }
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> SignUp(SignUp signup)
        {
            var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<SignUp>(signup.Email);
            if (response.Success || !string.IsNullOrEmpty(response?.Value?.Email))
            {
                return Ok("Email already Registered.");
            }

            var result = await CouchbaseHelper.CouchbaseClient.UpsertAsync(signup.Email, signup);
            _email.SignUpEmail("", signup.Email);
            return Ok(result);
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> ActivateSignUp(string email)
        {
            string dcrEmail = CryptoEngine.Decrypt(email);
            var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<SignUp>(dcrEmail);
            if (!response.Success)
            {
                return NotFound();
            }
            response.Value.Status = "active";
            var result = await CouchbaseHelper.CouchbaseClient.UpsertAsync(dcrEmail, response.Value);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> Login(string email, string password)
        {
            var parameters = new Dictionary<string, object>();
            var query = string.Format(@"SELECT {0}.* FROM {0} WHERE  email = $email and `password` = $password", CouchbaseHelper.Bucket);
            parameters.Add("$email", email);
            parameters.Add("$password", password);
            var req = new QueryRequest(query);
            req.AddNamedParameter(parameters.ToArray());
            var result = await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<SignUp>(req);
            if (result.Count > 0)
            {
                if (result.First().Status != "active")
                {
                    return StatusCode(401, "Email verification is pending.");
                }

                return Ok(result);
            }

            return Unauthorized();
        }

        [HttpGet]
        public async Task<IActionResult> GetRegisteredQuizDetails(string email)
        {
            var query = string.Format(@"SELECT {0}.* FROM {0} where documentType=""{1}"" and (email=""{2}"" or email2=""{2}"" or email3=""{2}"") ",
                CouchbaseHelper.Bucket, "Register", email);
            var req = new QueryRequest(query);
            var result = await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<UserRegistration>(req);
            return Ok(result);
        }

        #region Private Methods
        //private void SendMail(SignUp signup)
        //{
        //    var host = Request.Scheme + "://" + Request.Host + "/api/quiz/ActivateSignUp?email=" + signup.Email;

        //    MailMessage mail = new MailMessage();
        //    SmtpClient client = new SmtpClient("smtp.gmail.com");
        //    mail.From = new MailAddress("quiz@knowledgevysya.com");
        //    mail.To.Add(signup.Email);
        //    mail.Subject = "Activation email from KnowledgeVysya.";
        //    mail.Body = "Please click on the below link to activate your account, "+ host;
        //    client.Port = 25;
        //    client.Credentials = new System.Net.NetworkCredential("me", "password");
        //    client.UseDefaultCredentials = false; 
        //    client.EnableSsl = true;
        //    client.Host = "smtp.gmail.com";

        //    client.Send(mail);
        //}
        #endregion
    }
}