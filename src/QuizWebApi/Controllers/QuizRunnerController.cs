using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using QuizWebApi.Models.Admin;
using QuizWebApi.Models.Common;
using QuizWebApi.Models.QuizRunner;
using QuizWebApi.Utilities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace QuizWebApi.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    [Route("api/quiz/[action]")]
    [ApiController]
    [AllowAnonymous]
    public class QuizRunnerController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public EmailManager _email { get; }
        private readonly DomainConfig _domainConfig;

        public QuizRunnerController(EmailManager email, IHostingEnvironment hostingEnvironment, IOptions<DomainConfig> domainConfig)
        {
            this._email = email;
            this._hostingEnvironment = hostingEnvironment;
            this._domainConfig = domainConfig.Value;
            
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
        [HttpGet]
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
            answered.Value.QuizResultDetails[questionNo - 1].UserAnswer = answer;
            answered.Value.Status = status;
            answered.Value.LastAnsweredQuestion = questionNo;
            if (status.ToLower() == "completed" || status.ToLower() == "timeout")
            {
                TimeSpan diff = DateTime.UtcNow - answered.Value.QuizStartTime;
                if (status.ToLower() == "timeout")
                {
                    answered.Value.TimeTakenMinutes = (int)answered.Value.DurationInMinutes;
					answered.Value.TimeTakenSeconds = 0;
                }
                else
                {
                    if (diff.Minutes >= (int)answered.Value.DurationInMinutes)
                    {
                        answered.Value.TimeTakenMinutes = (int)answered.Value.DurationInMinutes;
						answered.Value.TimeTakenSeconds = 0;
                    }
                    else
                    {
                        answered.Value.TimeTakenMinutes = (diff.Minutes);
                        answered.Value.TimeTakenSeconds = diff.Seconds;
                    }
                }

                answered.Value.Email = email;
                var admindata = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizQuestions>(quizName + "_" + quizType + "_" + "questions");
                if (admindata?.Value != null)
                {
                    answered.Value.TotalScored = 0;
                    answered.Value.NumberOfCorrectAnswers = 0;
                    answered.Value.NumberOfWrongAnswers = 0;
                    foreach (var item in answered.Value.QuizResultDetails)
                    {
                        var adminconfig = admindata.Value.Questions.FirstOrDefault(x => x.QuestionNo == item.QuestionSet.QuestionNo);

                        item.AdminScore = adminconfig.Score;
                        item.QuestionSet.Answer = adminconfig.Answer;
                        if (item.UserAnswer != null && (item.UserAnswer.ToLower() == adminconfig.Answer.ToLower()))
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

            var response = await CouchbaseHelper.CouchbaseClient.UpsertAsync(quizName + "_" + quizType + "_" + teamName, answered.Value);
            return Ok(response);
        }

        /// <summary>
        /// Gets the quiz result.
        /// </summary>
        /// <param name="quizName">Name of the quiz.</param>
        /// <param name="quizType">Type of the quiz.</param>
        /// <param name="teamName">Name of the team.</param>
        /// <param name="questionNo">The question no.</param>
        /// <returns></returns>
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

        /// <summary>
        /// Checks the quiz taken.
        /// </summary>
        /// <param name="quizName">Name of the quiz.</param>
        /// <param name="quizType">Type of the quiz.</param>
        /// <param name="teamName">Name of the team.</param>
        /// <param name="email">The email.</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> CheckQuizTaken(string quizName, string quizType, string teamName, string email)
        {
            if (string.IsNullOrEmpty(quizName) || string.IsNullOrEmpty(quizType) || string.IsNullOrEmpty(teamName))
            {
                string message = "{\"message\":\"Mandatory fields missing.\"}";
                return BadRequest(message);
            }

            var definition = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizDefinition>(quizName + "_" + quizType);
            if (definition.Value.QuizStartTime > DateTime.UtcNow)
            {
                var alert = (!string.IsNullOrWhiteSpace(definition.Value.MessageBeforeQuizTime)) ?
                    definition.Value.MessageBeforeQuizTime : "Quiz Starts on " + definition.Value.QuizStartTime;
                string message = "{\"message\":\"" + alert + "\"}";
                return Ok(message);
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
                    if (!definition.Value.AllowConcurrentAccess && email.ToLower() != response?.Value.Email.ToLower())
                    {
                        string message = "{\"message\":\"Quiz is already taken by other member of team. Any one member of team is only allowed for this Quiz.\"}";
                        return Ok(message);
                    }

                    return Ok(true);
                }
            }

            return Ok(false);
        }
    }
}