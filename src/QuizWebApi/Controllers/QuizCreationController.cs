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
            if (request == null ||
                string.IsNullOrEmpty(request.QuizName) ||
                string.IsNullOrEmpty(request.QuizType) ||
                request.QuestionSet?.Count == 0)
            {
                return BadRequest("Mandatory Fields Missing.");
            }

            var builder = Builders<QuizDefinition>.Filter;
            var filter = builder.Eq("QuizName", request.QuizName) & builder.Eq("QuizType", request.QuizType);

            if (_mongoDatabase.GetCollection<QuizDefinition>("QuizDefinition")
                .Find(filter).ToList().Count > 0)
            {
                return BadRequest("This Quiz is already defined.");
            }

            if (request.NoOfQuestions != request.QuestionSet?.Count)
            {
                return BadRequest("Total Questions defined doesn't match with quiz set.");
            }

            _mongoDatabase.GetCollection<QuizDefinition>("QuizDefinition").InsertOne(request);
            return Ok();
        }

        /// <summary>
        /// Updates the rules.
        /// </summary>
        /// <param name="quizName">Name of the quiz.</param>
        /// <param name="quizType">Type of the quiz.</param>
        /// <param name="rules">The rules.</param>
        /// <returns></returns>
        [Route("/rules")]
        [HttpGet]
        public async Task<IActionResult> UpdateRules(string quizName, string quizType, string rules)
        {
            if (string.IsNullOrEmpty(rules) || string.IsNullOrEmpty(quizName) || string.IsNullOrEmpty(quizType))
            {
                return BadRequest("Mandatory Fields Missing.");
            }

            var builder = Builders<QuizDefinition>.Filter;
            var filter = builder.Eq("QuizName", quizName) & builder.Eq("QuizType", quizType);
            var update = Builders<QuizDefinition>.Update.Set(o => o.RulesAndRegulations, rules);
            var response = _mongoDatabase.GetCollection<QuizDefinition>("QuizDefinition").UpdateOne(filter, update);

            if (response.MatchedCount > 0 && response.ModifiedCount > 0)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Sets the quiz.
        /// </summary>
        /// <param name="questionSet">The question set.</param>
        /// <returns></returns>
        [Route("/set")]
        [HttpPost]
        public async Task<IActionResult> SetQuiz([FromBody] QuizSet questionSet)
        {
            if (questionSet == null || string.IsNullOrEmpty(questionSet.QuizName) || string.IsNullOrEmpty(questionSet.QuizType))
            {
                return BadRequest("Mandatory Fields Missing.");
            }

            _mongoDatabase.GetCollection<QuizSet>("QuizSet").InsertOne(questionSet);
            return Ok();
        }

        /// <summary>
        /// Gets all quiz.
        /// </summary>
        /// <returns></returns>
        [Route("/getallquiz")]
        [HttpGet]
        public async Task<IActionResult> GetAllQuiz()
        {
            var result = _mongoDatabase.GetCollection<QuizDefinition>("QuizDefinition").Find(FilterDefinition<QuizDefinition>.Empty).ToList();
            if (result?.Count > 0)
            {
                return Ok(result);
            }
            else
            {
                return NotFound("No Quizes is defined so far.");
            }
        }
    }
}