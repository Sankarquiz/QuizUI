using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using QuizWebApi.Models.Admin;
using System.Linq;
using System.Threading.Tasks;

namespace QuizWebApi.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    [Route("api/[controller]")]
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
        [HttpPost]
        public async Task<IActionResult> DefineQuiz(QuizDefinition request)
        {
            _mongoDatabase.GetCollection<QuizDefinition>("QuizDefinition").InsertOne(request);
            return Ok();
        }

        /// <summary>
        /// Updates the rules.
        /// </summary>
        /// <param name="rules">The rules.</param>
        /// <param name="quizName">Name of the quiz.</param>
        /// <param name="quizType">Type of the quiz.</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> UpdateRules(string quizName, string quizType, string rules)
        {
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

        [HttpPost]
        public async Task<IActionResult> SetQuiz(string quizName, string quizType, QuizSet questionSet)
        {
            //fetch the details from CustomerDB and pass into view  
            var result = _mongoDatabase.GetCollection<QuizDefinition>("QuizDefinition");
            var update = Builders<QuizDefinition>.Update.Set(o => o.RulesAndRegulations, rules);
            result.UpdateOne(o => o.RulesAndRegulations == "", update);
            return Ok(result);
        }
    }
}