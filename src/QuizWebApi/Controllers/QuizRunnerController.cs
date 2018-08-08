using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizWebApi.Models.QuizRunner;
using System.Threading.Tasks;

namespace QuizWebApi.Controllers
{
    [Route("api/quiz/[action]")]
    [ApiController]
    [AllowAnonymous]
    public class QuizRunnerController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> SaveQuizRunner([FromBody]QuizResult request)
        {
            if (request == null ||
                string.IsNullOrEmpty(request.QuizName) ||
                string.IsNullOrEmpty(request.QuizType) ||
              request.QuizResultDetails?.Count == 0)
            {
                return BadRequest("Mandatory Fields Missing.");
            }

            var response = await CouchbaseHelper.CouchbaseClient.UpsertAsync(request.QuizName + "_" + request.QuizType + "_" + request.TeamName, request);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> CheckQuizTaken(string quizName, string quizType, string teamName)
        {
            if (string.IsNullOrEmpty(quizName) || string.IsNullOrEmpty(quizType) || string.IsNullOrEmpty(teamName))
            {
                return BadRequest("Mandatory Fields Missing.");
            }

            var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizResult>(quizName + "_" + quizType + "_" + teamName);
            if (string.IsNullOrEmpty(response?.Value?.TeamName))
            {
                return Ok(true);
            }
            return Ok(false);
        }
    }
}