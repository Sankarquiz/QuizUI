using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizWebApi.Models.Admin;
using QuizWebApi.Models.QuizRunner;
using System.Linq;
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


            var admindata = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizQuestions>(request.QuizName + "_" + request.QuizType + "_" + "questions");
            if (admindata?.Value != null)
            {
                foreach (var item in request.QuizResultDetails)
                {
                    var adminconfig = admindata.Value.Questions.Where(x => x.QuestionNo == item.questionNo).FirstOrDefault();
                    item.adminAnswer = adminconfig.Answer;
                    item.adminScore = adminconfig.Score;
                    if (item.userAnswer.ToLower() == adminconfig.Answer.ToLower())
                    {
                        request.TotalScored += adminconfig.Score; ;
                        request.NumberOfCorrectAnswers++;
                        item.userScored = adminconfig.Score;
                    }
                    else
                    {
                        request.NumberOfWrongAnswers++;
                    }
                }
            }

            var response = await CouchbaseHelper.CouchbaseClient.UpsertAsync(request.QuizName + "_" + request.QuizType + "_" + request.TeamName, request);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetQuizResult(string quizName, string quizType, string teamName)
        {
            if (string.IsNullOrEmpty(quizName) || string.IsNullOrEmpty(quizType) || string.IsNullOrEmpty(teamName))
            {
                return BadRequest("Mandatory Fields Missing.");
            }

            var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizResult>(quizName + "_" + quizType + "_" + teamName);
            return Ok(response.Value);
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