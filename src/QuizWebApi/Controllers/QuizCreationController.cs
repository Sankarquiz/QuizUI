using Couchbase.N1QL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using QuizWebApi.Models.Admin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace QuizWebApi.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    [Route("api/quiz/[action]")]
    [ApiController]
    [AllowAnonymous]
    public class QuizCreationController : ControllerBase
    {
        // private IMongoDatabase _mongoDatabase;
        const string _imagePath = @"..\QuizWebApi\Images";

        /// <summary>
        /// Defines the quiz.
        /// </summary>
        /// <param name="request">The request.</param> 
        /// <returns></returns>
        //[Route("/define")]
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
        //[Route("/getallquiz")]
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
        //[Route("/setquestion")]
        [HttpPost]
        public async Task<IActionResult> SetQuiz([FromBody] QuizQuestions questionSet)
        {
            if (questionSet == null || string.IsNullOrEmpty(questionSet.QuizName) || string.IsNullOrEmpty(questionSet.QuizType) || questionSet.Questions?.Count == 0)
            {
                return BadRequest("Mandatory Fields Missing.");
            }
            questionSet.DocumentType = "QuestionSet";
            var response = await CouchbaseHelper.CouchbaseClient.UpsertAsync(questionSet.QuizName + "_" + questionSet.QuizType + "_" + "questions", questionSet);
            return Ok(response);
        }


        /// <summary>
        /// Gets the quiz.
        /// </summary>
        /// <param name="quizName">Name of the quiz.</param>
        /// <param name="quizType">Type of the quiz.</param>
        /// <param name="DocumentType">Type of the document.</param>
        /// <returns></returns>
        /// //[Route("/getquiz")]
        [HttpGet]
        public async Task<IActionResult> GetQuiz(string quizName, string quizType, string DocumentType)
        {
            if (string.IsNullOrEmpty(quizName) || string.IsNullOrEmpty(quizType) || string.IsNullOrEmpty(DocumentType))
            {
                return BadRequest("Mandatory Fields Missing.");
            }
            if (DocumentType == "Define")
            {
                var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizDefinition>(quizName + "_" + quizType);
                return Ok(response.Value);
            }
            else
            {
                var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizQuestions>(quizName + "_" + quizType + "_" + "questions");
                return Ok(response.Value);
            }
        }

        /// <summary>
        /// Uploads the image.
        /// </summary>
        /// <returns></returns> 

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            try
            {
                var parsedContentDisposition = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
                var filename = Path.Combine(_imagePath, parsedContentDisposition.FileName.Trim().ToString());

                // var filePath = Path.Combine(_imagePath, file.FileName);
                var filePath = filename;
                if (file.Length > 0)
                {
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                }

                return Ok(true);
            }
            catch (Exception e)
            {
                return Ok(false);
            }
        }

        //[Route("/setregistration")]
        //[HttpPost]
        //public async Task<IActionResult> SetRegistration([FromBody] RegistrationFields registrationSet)
        //{
        //    if (registrationSet == null || string.IsNullOrEmpty(registrationSet.QuizName) || string.IsNullOrEmpty(registrationSet.QuizType))
        //    {
        //        return BadRequest("Mandatory Fields Missing.");
        //    }
        //    registrationSet.DocumentType = "Registration";
        //    var response = await CouchbaseHelper.CouchbaseClient.UpsertAsync(registrationSet.QuizName + "_" + registrationSet.QuizType + "_registration", registrationSet);
        //    return Ok(response);
        //}

        //[Route("/getregistration")]
        //[HttpPost]
        //public async Task<IActionResult> GetRegistration(string quizName, string quizType)
        //{
        //    if (string.IsNullOrEmpty(quizName) || string.IsNullOrEmpty(quizType))
        //    {
        //        return BadRequest("Mandatory Fields Missing.");
        //    }
        //    var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<RegistrationFields>(quizName + "_" + quizType + "_registration");
        //    return Ok(response);
        //}

        //[Route("/setSponsorDetails")]
        //[HttpPost]
        //public async Task<IActionResult> SetSponsorDetails([FromBody] SponsorDetail sponserdata)
        //{
        //    if (sponserdata == null || string.IsNullOrEmpty(sponserdata.QuizName) || string.IsNullOrEmpty(sponserdata.QuizType))
        //    {
        //        return BadRequest("Mandatory Fields Missing.");
        //    }
        //    sponserdata.DocumentType = "Registration";
        //    var response = await CouchbaseHelper.CouchbaseClient.UpsertAsync(sponserdata.QuizName + "_" + sponserdata.QuizType + "_sponser", sponserdata);
        //    return Ok(response);
        //}

        //[Route("/getSponsorDetails")]
        //[HttpPost]
        //public async Task<IActionResult> GetSponsorDetails(string quizName, string quizType)
        //{
        //    if (string.IsNullOrEmpty(quizName) || string.IsNullOrEmpty(quizType))
        //    {
        //        return BadRequest("Mandatory Fields Missing.");
        //    }
        //    var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<RegistrationFields>(quizName + "_" + quizType + "_sponser");
        //    return Ok(response);
        //}  
    }
}