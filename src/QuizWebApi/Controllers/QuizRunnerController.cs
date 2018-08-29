using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizWebApi.Models.Admin;
using QuizWebApi.Models.QuizRunner;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace QuizWebApi.Controllers
{
    [Route("api/quiz/[action]")]
    [ApiController]
    [AllowAnonymous]
    public class QuizRunnerController : Controller
    {
        // RunnerBC _runnerBC;

        /// <summary>
        /// Initializes a new instance of the <see cref="QuizRunnerController"/> class.
        /// </summary>
        public QuizRunnerController()
        {
            //_runnerBC = new RunnerBC();
        }
        /// <summary>
        /// Saves the quiz runner.
        /// </summary>
        /// <param name="quizName">Name of the quiz.</param>
        /// <param name="quizType">Type of the quiz.</param>
        /// <param name="teamName">Name of the team.</param>
        /// <param name="email">The email.</param>
        /// <param name="status">The status.</param>
        /// <param name="questionNo">The question no.</param>
        /// <param name="answer">The answer.</param>
        /// <returns></returns>
        [HttpPost]
        //public async Task<IActionResult> SaveQuizRunner([FromBody]QuizResultDetails request)
        public async Task<IActionResult> SaveQuizRunner(string quizName, string quizType, string teamName, string email, string status, int questionNo, string answer)
        {
            if (
             string.IsNullOrEmpty(quizName) ||
             string.IsNullOrEmpty(quizType) ||
             string.IsNullOrEmpty(teamName))
            {
                var message = "{\"message\":\"QuizName or QuizType is missing.\"}";
                return BadRequest(message);
            }

            var answered = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizResult>(quizName + "_" + quizType + "_" + teamName);
            answered.Value.QuizResultDetails[questionNo].UserAnswer = answer;

            if (status.ToLower() == "completed" || status.ToLower() == "timeout")
            {
                TimeSpan diff = DateTime.UtcNow - answered.Value.QuizStartTime;
                if (status == "timeout")
                {
                    answered.Value.TimeTakenMinutes = answered.Value.DurationInMinutes;
                }
                else
                {
                    answered.Value.TimeTakenMinutes = diff.Minutes;
                    answered.Value.TimeTakenSeconds = diff.Seconds;
                }
                answered.Value.Email = email;
                var admindata = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizQuestions>(quizName + "_" + quizType + "_" + "questions");
                if (admindata?.Value != null)
                {
                    foreach (var item in answered.Value.QuizResultDetails)
                    {
                        var adminconfig = admindata.Value.Questions.FirstOrDefault(x => x.QuestionNo == item.QuestionSet.QuestionNo);

                        item.AdminScore = adminconfig.Score;
                        if (item.UserAnswer.ToLower() == adminconfig.Answer.ToLower())
                        {
                            answered.Value.TotalScored += adminconfig.Score; ;
                            answered.Value.NumberOfCorrectAnswers++;
                            item.UserScored = adminconfig.Score;
                        }
                        else
                        {
                            answered.Value.NumberOfWrongAnswers++;
                        }
                    }
                }
            }

            var response = await CouchbaseHelper.CouchbaseClient.UpsertAsync(quizName + "_" + quizType + "_" + teamName, answered);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetQuizResult(string quizName, string quizType, string teamName, int questionNo = 0)
        {
            if (string.IsNullOrEmpty(quizName) || string.IsNullOrEmpty(quizType) || string.IsNullOrEmpty(teamName))
            {
                var message = "{\"message\":\"QuizName or QuizType or TeamName is missing.\"}";
                return BadRequest(message);
            }

            if (questionNo > 0)
            {
                var question = (await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizResult>(quizName + "_" + quizType + "_" + teamName))
                    .Value.QuizResultDetails[questionNo - 1];
                return Ok(question);
            }

            var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizResult>(quizName + "_" + quizType + "_" + teamName);
            return Ok(response.Value);

        }

        [HttpGet]
        public async Task<IActionResult> CheckQuizTaken(string quizName, string quizType, string teamName)
        {
            if (string.IsNullOrEmpty(quizName) || string.IsNullOrEmpty(quizType) || string.IsNullOrEmpty(teamName))
            {
                var message = "{\"message\":\"Mandatory fields missing.\"}";
                return BadRequest(message);
            }

            var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizResult>(quizName + "_" + quizType + "_" + teamName);
            if (string.IsNullOrEmpty(response?.Value?.TeamName))
            {
                return Ok(true);
            }

            if (response?.Value?.Status.ToLower() == "started" ||
              response?.Value?.Status.ToLower() == "incomplete")
            {
                if (response.Value.QuizStartTime.AddMinutes(response.Value.DurationInMinutes) > DateTime.UtcNow)
                {
                    return Ok(true);
                }

            }

            return Ok(false);
        }
    }
}