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
                user.Message = "You have already registered for this quiz with team " + res.First().TeamName;
                return Ok(user.Message);
            }

            query = string.Format(@"SELECT {0}.* FROM {0} WHERE documentType=""{1}"" and quizName=""{2}"" and quizType=""{3}"" and teamName=""{4}"" ",
                         CouchbaseHelper.Bucket, "Register", user.QuizName, user.QuizType, user.TeamName);
            req = new QueryRequest(query);
            res = await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<UserRegistration>(req);
            if (res.Count > 0)
            {
                user.Message = " is already registered for this quiz.Please try with different name.";
                return Ok(user.Message);
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
                signup.Message = "Email already Registered.";
                return Ok(signup);
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
            SignUp signup = null;
            if (result.Count > 0)
            {
                signup = result.First();
                if (signup != null)
                {
                    if (signup.Status != "active")
                    {
                        var message = "{\"message\":\"Email verification is pending.\"}";
                        return Ok(message);
                    }
                    return Ok(signup);
                }
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
    }
}