using Couchbase.N1QL;
using Microsoft.AspNetCore.Mvc;
using QuizWebApi.Models.Admin;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizWebApi.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    [Route("api/quiz")]
    [ApiController]
    public class QuizCreationController : ControllerBase
    {
        // private IMongoDatabase _mongoDatabase;

        /// <summary>
        /// Initializes a new instance of the <see cref="QuizCreationController"/> class.
        /// </summary>
        /// <param name="mongoDatabase">The mongo database.</param>
        public QuizCreationController()
        {
            // _mongoDatabase = mongoDatabase;
        }

        /// <summary>
        /// Defines the quiz.
        /// </summary>
        /// <param name="request">The request.</param> 
        /// <returns></returns>
        [Route("/define")]
        [HttpPost]
        public async Task<IActionResult> DefineQuiz([FromBody]QuizDefinition request)
        {
            if (request == null ||
                string.IsNullOrEmpty(request.QuizName) ||
                string.IsNullOrEmpty(request.QuizType))
            // || request.QuestionSet?.Count == 0)
            {
                return BadRequest("Mandatory Fields Missing.");
            }
            request.DocumentType = "Define";
            var parameters = new Dictionary<string, object>();
            var query = string.Format(@"SELECT quizName FROM {0} WHERE status=""{1}"" and quizName = $quizName and quizType = $quizType and documentType=""{2}""", CouchbaseHelper.Bucket, "Published", "Define");
            parameters.Add("$quizName", request.QuizName);
            parameters.Add("$quizType", request.QuizType);
            var req = new QueryRequest(query);
            req.AddNamedParameter(parameters.ToArray());
            var result = await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<QuizDefinition>(req);
            if (result.Count > 0)
            {
                return BadRequest("This Quiz is already Published.");
            }

            var response = await CouchbaseHelper.CouchbaseClient.UpsertAsync(request.QuizName + "_" + request.QuizType, request);
            return Ok(response);
        }

        /// <summary>
        /// Gets all quiz.
        /// </summary>
        /// <returns></returns>
        [Route("/getallquiz")]
        [HttpGet]
        public async Task<IActionResult> GetAllQuiz()
        {
            var query = string.Format(@"SELECT {0}.* FROM {0} where documentType=""{1}""", CouchbaseHelper.Bucket, "Define");
            var req = new QueryRequest(query);
            var result = await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<QuizDefinition>(req);
            if (result?.Count > 0)
            {
                return Ok(result);
            }
            else
            {
                return NotFound("No Quizes is defined so far.");
            }
        }

        /// <summary>
        /// Sets the quiz.
        /// </summary>
        /// <param name="questionSet">The question set.</param>
        /// <returns></returns>
        [Route("/setquestion")]
        [HttpPost]
        public async Task<IActionResult> SetQuiz([FromBody] QuizSet questionSet)
        {
            if (questionSet == null || string.IsNullOrEmpty(questionSet.QuizName) || string.IsNullOrEmpty(questionSet.QuizType) || questionSet.QuestionNo == 0)
            {
                return BadRequest("Mandatory Fields Missing.");
            }
            questionSet.DocumentType = "QuestionSet";
            var response = await CouchbaseHelper.CouchbaseClient.UpsertAsync(questionSet.QuizName + "_" + questionSet.QuizType + "_" + questionSet.QuestionNo, questionSet);
            return Ok(response);
        }

        [Route("/getquiz")]
        [HttpPost]
        public async Task<IActionResult> GetQuiz(string quizName, string quizType, int questionNumber = 0)
        {
            if (string.IsNullOrEmpty(quizName) || string.IsNullOrEmpty(quizType))
            {
                return BadRequest("Mandatory Fields Missing.");
            }
            if (questionNumber == 0)
            {
                var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizDefinition>(quizName + "_" + quizType);
                return Ok(response);
            }
            else
            {
                var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizSet>(quizName + "_" + quizType + "_" + questionNumber);
                return Ok(response);
            }
        }

        [Route("/setregistration")]
        [HttpPost]
        public async Task<IActionResult> SetRegistration([FromBody] RegistrationFields RegistrationSet)
        {
            if (RegistrationSet == null || string.IsNullOrEmpty(RegistrationSet.QuizName) || string.IsNullOrEmpty(RegistrationSet.QuizType))
            {
                return BadRequest("Mandatory Fields Missing.");
            }
            RegistrationSet.DocumentType = "Registration";
            var response = await CouchbaseHelper.CouchbaseClient.UpsertAsync(RegistrationSet.QuizName + "_" + RegistrationSet.QuizType + "_registration", RegistrationSet);
            return Ok(response);
        }

        [Route("/getregistration")]
        [HttpPost]
        public async Task<IActionResult> GetRegistration(string quizName, string quizType)
        {
            if (string.IsNullOrEmpty(quizName) || string.IsNullOrEmpty(quizType))
            {
                return BadRequest("Mandatory Fields Missing.");
            }
            var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<RegistrationFields>(quizName + "_" + quizType + "_registration");
            return Ok(response);
        }
    }
}