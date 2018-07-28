using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using QuizWebApi.Models.Admin;
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
        private IMongoDatabase _mongoDatabase;

        /// <summary>
        /// Initializes a new instance of the <see cref="QuizCreationController"/> class.
        /// </summary>
        /// <param name="mongoDatabase">The mongo database.</param>
        public QuizCreationController(IMongoDatabase mongoDatabase)
        {
            _mongoDatabase = mongoDatabase;
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
            Status status = new Status();
            if (request == null ||
                string.IsNullOrEmpty(request.QuizName) ||
                string.IsNullOrEmpty(request.QuizType))
            // || request.QuestionSet?.Count == 0)
            {
                status = new Status
                {
                    Code = 101,
                    Message = "Mandatory Fields Missing.",
                    Type = "Error"
                };
                return BadRequest(status);
            }

            var builder = Builders<QuizDefinition>.Filter;
            var filter = builder.Eq("QuizName", request.QuizName) &
                            builder.Eq("QuizType", request.QuizType) &
                            builder.Eq("Status", "Published");

            if (_mongoDatabase.GetCollection<QuizDefinition>("QuizDefinition")
                .Find(filter).ToList().Count > 0)
            {
                status = new Status
                {
                    Code = 101,
                    Message = "This Quiz is already Published.",
                    Type = "Error"
                };
                return BadRequest(status);
            }

            builder = Builders<QuizDefinition>.Filter;
            filter = builder.Eq("QuizName", request.QuizName) &
                          builder.Eq("QuizType", request.QuizType);
            if (_mongoDatabase.GetCollection<QuizDefinition>("QuizDefinition")
               .Find(filter).ToList().Count > 0)
            {
                var update = Builders<QuizDefinition>.Update.Set(o => o, request);
                var response = _mongoDatabase.GetCollection<QuizDefinition>("QuizDefinition").UpdateOne(filter, update);

                if (response.MatchedCount > 0 && response.ModifiedCount > 0)
                {
                    status = new Status
                    {
                        Code = 100,
                        Message = "Quiz Updated.",
                        Type = "Info"
                    };
                    return Ok(status);
                }
            }
            _mongoDatabase.GetCollection<QuizDefinition>("QuizDefinition").InsertOne(request);
            status = new Status
            {
                Code = 100,
                Message = "Quiz Defined.",
                Type = "Info"
            };
            return Ok(status);
        }

        ///// <summary>
        ///// Updates the rules.
        ///// </summary>
        ///// <param name="quizName">Name of the quiz.</param>
        ///// <param name="quizType">Type of the quiz.</param>
        ///// <param name="rules">The rules.</param>
        ///// <returns></returns>
        //[Route("/rules")]
        //[HttpGet]
        //public async Task<IActionResult> UpdateRules(string quizName, string quizType, string rules)
        //{
        //    if (string.IsNullOrEmpty(rules) || string.IsNullOrEmpty(quizName) || string.IsNullOrEmpty(quizType))
        //    {
        //        return BadRequest("Mandatory Fields Missing.");
        //    }

        //    var builder = Builders<QuizDefinition>.Filter;
        //    var filter = builder.Eq("QuizName", quizName) & builder.Eq("QuizType", quizType);
        //    var update = Builders<QuizDefinition>.Update.Set(o => o.RulesAndRegulations, rules);
        //    var response = _mongoDatabase.GetCollection<QuizDefinition>("QuizDefinition").UpdateOne(filter, update);

        //    if (response.MatchedCount > 0 && response.ModifiedCount > 0)
        //    {
        //        return Ok();
        //    }
        //    else
        //    {
        //        return NotFound();
        //    }
        //}

        ///// <summary>
        ///// Sets the quiz.
        ///// </summary>
        ///// <param name="questionSet">The question set.</param>
        ///// <returns></returns>
        //[Route("/set")]
        //[HttpPost]
        //public async Task<IActionResult> SetQuiz([FromBody] QuizSet questionSet)
        //{
        //    if (questionSet == null || string.IsNullOrEmpty(questionSet.QuizName) || string.IsNullOrEmpty(questionSet.QuizType))
        //    {
        //        return BadRequest("Mandatory Fields Missing.");
        //    }

        //    _mongoDatabase.GetCollection<QuizSet>("QuizSet").InsertOne(questionSet);
        //    return Ok();
        //}

        /// <summary>
        /// Gets all quiz.
        /// </summary>
        /// <returns></returns>
        [Route("/getallquiz")]
        [HttpGet]
        public async Task<IActionResult> GetAllQuiz()
        {
            var result = _mongoDatabase.GetCollection<QuizDefinition>("QuizDefinition")
                .Find(FilterDefinition<QuizDefinition>.Empty).ToList();
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
        /// Gets all quiz.
        /// </summary>
        /// <returns></returns>
        [Route("/getquiz")]
        [HttpGet]
        public async Task<IActionResult> GetQuiz(string quizName, string quizType)
        {
            var builder = Builders<QuizDefinition>.Filter;
            var filter = builder.Eq("QuizName", quizName) &
                            builder.Eq("QuizType", quizType);

            if (_mongoDatabase.GetCollection<QuizDefinition>("QuizDefinition")
              .Find(filter).ToList().Count == 0)
            {
                return NotFound();
            }
            return Ok(_mongoDatabase.GetCollection<QuizDefinition>("QuizDefinition")
            .Find(filter).First());
        }
    }
}