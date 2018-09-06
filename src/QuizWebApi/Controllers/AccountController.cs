using Couchbase.N1QL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using QuizWebApi.Models.User;
using QuizWebApi.Utilities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace QuizWebApi.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    [Route("api/quiz/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        const string _imagePath = @"images/user";

        /// <summary>
        /// Gets the email.
        /// </summary>
        /// <value>
        /// The email.
        /// </value>
        public EmailManager _email { get; }
        private readonly IHostingEnvironment _hostingEnvironment;

        /// <summary>
        /// Initializes a new instance of the <see cref="AccountController"/> class.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <param name="hostingEnvironment">The hosting environment.</param>
        public AccountController(EmailManager email, IHostingEnvironment hostingEnvironment)
        {
            _email = email;
            _hostingEnvironment = hostingEnvironment;
        }

        /// <summary>
        /// Registers the specified user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns></returns>
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

        /// <summary>
        /// Signs up.
        /// </summary>
        /// <param name="signup">The signup.</param>
        /// <returns></returns>
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

        /// <summary>
        /// Activates the sign up.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <returns></returns>
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

        /// <summary>
        /// Logins the specified email.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <param name="password">The password.</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Login(string email, string password)
        {
            try
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
                        if (signup.Url != null && signup.Url.Length > 0)
                        {
                            signup.Url = Request.Scheme + "://" + Request.Host + "/" + _imagePath.Trim() + "/" + signup.Url.Trim();
                        }
                        return Ok(signup);
                    }
                }

                return Unauthorized();
            }
            catch (Exception e)
            {
                return Unauthorized();
            }
        }

        /// <summary>
        /// Gets the registered quiz details.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetRegisteredQuizDetails(string email)
        {
            var query = string.Format(@"SELECT {0}.* FROM {0} where documentType=""{1}"" and (email=""{2}"" or email2=""{2}"" or email3=""{2}"") ",
                CouchbaseHelper.Bucket, "Register", email);
            var req = new QueryRequest(query);
            var result = await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<UserRegistration>(req);
            return Ok(result);
        }


        /// <summary>
        /// Views the users.
        /// </summary>
        /// <param name="mode">The mode.</param>
        /// <returns></returns>
        [HttpGet("{mode}")]
        public async Task<IActionResult> ViewUsers(int mode)
        {
            var query = string.Format(@"SELECT Quiz.* FROM Quiz where documentType='user' ",
                CouchbaseHelper.Bucket);
            var req = new QueryRequest(query);
            var result = await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<SignUp>(req);
            return Ok(result);
        }

        /// <summary>
        /// Changes the passwd.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <param name="passwd">The passwd.</param>
        /// <returns></returns>
        [HttpGet("{email}/{passwd}")]
        public async Task<IActionResult> ChangePasswd(string email, string passwd)
        {
            var query = string.Format(@"update Quiz set `password`='{1}' where email='{0}'",
                                     email, passwd);
            var req = new QueryRequest(query);
            var result = await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<SignUp>(req);
            return Ok(result);
        }


        /// <summary>
        /// Updates the profile.
        /// </summary>
        /// <param name="signup">The signup.</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> UpdateProfile(SignUp signup)
        {
            try
            {
                string query = string.Empty;
                if (signup.Url != null && signup.Url.Length > 0)
                {
                    query = string.Format(@"update `Quiz` set url='{0}', source='{1}', firstname='{3}', lastname='{4}' where email='{2}'",
                                             signup.Url, signup.Source, signup.Email, signup.Firstname, signup.Lastname);
                }
                else
                {
                    query = string.Format(@"update `Quiz` set source='{0}', firstname='{2}', lastname='{3}' where email='{1}'",
                                             signup.Source, signup.Email, signup.Firstname, signup.Lastname);
                }
                var req = new QueryRequest(query);
                var result = await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<SignUp>(req);
                return Ok(result);
            }
            catch (Exception e)
            {
                return Ok(new SignUp("Profile could  not update. Please try again."));
            }

        }


        /// <summary>
        /// Uploads the user image.
        /// </summary>
        /// <param name="file">The file.</param>
        /// <returns></returns>
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> UploadUserImage(IFormFile file)
        {
            try
            {

                string webRootPath = _hostingEnvironment.WebRootPath;
                string contentRootPath = _hostingEnvironment.ContentRootPath;

                var parsedContentDisposition = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
                var filename = Path.Combine(webRootPath, _imagePath.Trim(), parsedContentDisposition.FileName.Trim().ToString());

                var hosturl = Request.Scheme + "://" + Request.Host + "/" + _imagePath.Trim() + "/";

                string newprofileimage = DateTime.Now.Ticks.ToString() + "-" + parsedContentDisposition.FileName.Trim();
                hosturl = hosturl + newprofileimage;

                var filePath = filename.Replace(parsedContentDisposition.FileName.ToString(), newprofileimage.Trim());
                if (file.Length > 0)
                {
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                }

                return Ok(new UserProfile(newprofileimage, hosturl));
            }
            catch (Exception e)
            {
                return Ok(new UserProfile("File could not be uploaded, Please try again."));
            }
        }
    }
}