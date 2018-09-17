﻿using Couchbase.N1QL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using QuizWebApi.Models.Admin;
using QuizWebApi.Models.Common;
using QuizWebApi.Models.QuizRunner;
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
    [AllowAnonymous]
    public class QuizCreationController : ControllerBase
    {
        const string _imagePath = @"images";
        private readonly IHostingEnvironment _hostingEnvironment;
        private string imageBaseUrl;

        /// <summary>
        /// <summary>
        /// QuizCreationController
        /// </summary>              
        public QuizCreationController(IHostingEnvironment hostingEnvironment, IOptions<DomainConfig> domainConfig)
        {
            _hostingEnvironment = hostingEnvironment;
            imageBaseUrl = domainConfig.Value.BaseUrl;
        }

        /// <summary>
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
            {
                var message = "{\"message\":\"Mandatory fields missing.\"}";
                return BadRequest(message);
            }
            request.DocumentType = "Define";
            var parameters = new Dictionary<string, object>();
            var query = string.Format(@"SELECT quizName FROM {0} WHERE and quizStartTime > CLOCK_LOCAL() and quizName = $quizName and quizType = $quizType and documentType=""{1}""", CouchbaseHelper.Bucket, "Define");
            parameters.Add("$quizName", request.QuizName);
            parameters.Add("$quizType", request.QuizType);
            var req = new QueryRequest(query);
            req.AddNamedParameter(parameters.ToArray());
            var result = await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<QuizDefinition>(req);
            if (result.Count > 0)
            {
                var message = "{\"message\":\"This Quiz is already Started or Published.\"}";
                return Ok(message);
            }

            var response = await CouchbaseHelper.CouchbaseClient.UpsertAsync(request.QuizName + "_" + request.QuizType, request);
            return Ok(response);
        }

        /// <summary>
        /// Gets the quiz count.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetQuizCount(string email)
        {
            var query = string.Format(@"SELECT count(1) as cnt FROM {0} where documentType=""{1}"" and createdBy=""{2}"" ",
                CouchbaseHelper.Bucket, "Define", email);
            var req = new QueryRequest(query);
            var result = (await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<dynamic>(req)).FirstOrDefault();
            return Ok(result.cnt.Value);
        }

        [HttpGet("{documenttype}")]
        public async Task<IActionResult> GetDocumentCount(string documenttype)
        {
            var query = string.Format(@"SELECT count(1) as cnt FROM {0} where documentType=""{1}"" ",
                CouchbaseHelper.Bucket, documenttype);
            var req = new QueryRequest(query);
            var result = (await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<dynamic>(req)).FirstOrDefault();
            return Ok(result.cnt.Value);
        }
        /// <summary>
        /// Gets all quiz.
        /// </summary>
        /// <returns></returns>
        //[Route("/getallquiz")]
        [HttpGet]
        public async Task<IActionResult> GetAllQuiz(string email, int pageNumber, int pageSize)
        {
            if (pageNumber == 0)
            {
                pageNumber = 1;
            }
            pageNumber = (pageNumber - 1) * pageSize;
            var query = string.Format(@"SELECT {0}.* FROM {0} where documentType=""{1}"" and createdBy=""{2}"" offset {3} limit {4} ",
                CouchbaseHelper.Bucket, "Define", email, pageNumber, pageSize);
            var req = new QueryRequest(query);
            var result = await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<QuizDefinition>(req);

            //var host = Request.Scheme + "://" + Request.Host + "/images/";
            var host = imageBaseUrl + "images/";
            foreach (var quiz in result.Select(x => x))
            {
                foreach (var item in quiz.SponsorList.Select(x => x))
                {
                    item.Path = Path.Combine(host, item.ImageName);
                }
            }
            return Ok(result);
        }

        /// <summary>
        /// Gets all quiz.
        /// </summary>
        /// <returns></returns>
        //[Route("/getallquiz")]
        [HttpGet]
        public async Task<IActionResult> GetActiveQuizDetails()
        {
            var query = string.Format(@"SELECT {0}.* FROM {0} where documentType=""{1}"" and status=""{2}"" and quizEndTime > CLOCK_LOCAL()", CouchbaseHelper.Bucket, "Define", "Published");
            var req = new QueryRequest(query);
            var result = await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<QuizDefinition>(req);
            return Ok(result);
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
                var message = "{\"message\":\"Mandatory fields missing.\"}";
                return BadRequest(message);
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
        /// <param name="documentType">Type of the document.</param>
        /// <param name="teamName">Name of the team.</param>
        /// <param name="email">The email.</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetQuiz(string quizName, string quizType, string documentType, string teamName = "", string email = "")
        {
            if (string.IsNullOrEmpty(quizName) || string.IsNullOrEmpty(quizType) || string.IsNullOrEmpty(documentType))
            {
                var message = "{\"message\":\"Mandatory fields missing.\"}";
                return BadRequest(message);
            }

            var host = imageBaseUrl + "images/";
            if (documentType.ToLower() == "define")
            {
                var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizDefinition>(quizName + "_" + quizType);
                foreach (var item in response.Value.SponsorList.Select(x => x))
                {
                    item.Path = host + item.ImageName;
                }
                return Ok(response.Value);
            }
            else if (documentType.ToLower() == "withanswer")
            {
                var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizQuestions>(quizName + "_" + quizType + "_" + "questions");

                foreach (var item in response.Value.Questions.Where(x => x.IsImageneeded == true))
                {
                    if (!string.IsNullOrWhiteSpace(item.ImageName))
                    {
                        if (item.ImageName.ToLower().StartsWith("http"))
                        {
                            item.ImagePath = item.ImageName;
                        }
                        else
                        {
                            item.ImagePath = host + item.ImageName;
                        }
                    }
                }

                return Ok(response.Value);
            }
            else
            {
                var questionbank = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizResult>(quizName + "_" + quizType + "_" + teamName);
                if (!string.IsNullOrEmpty(questionbank?.Value?.TeamName))
                {
                    questionbank.Value.DurationInMinutes = (questionbank.Value.QuizStartTime.AddMinutes(
                        questionbank.Value.DurationInMinutes).Subtract(DateTime.UtcNow).TotalMinutes > 0) ? (int)questionbank.Value.QuizStartTime.AddMinutes(
                        questionbank.Value.DurationInMinutes).Subtract(DateTime.UtcNow).TotalMinutes : 1;
                    return Ok(questionbank.Value);
                }

                var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizQuestions>(quizName + "_" + quizType + "_" + "questions");
                var res = new QuizResult();
                res.DocumentType = "quizresult";
                res.QuizName = quizName;
                res.QuizType = quizType;
                res.TeamName = teamName;
                res.Email = email;
                res.QuizStartTime = DateTime.UtcNow;
                var definition = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizDefinition>(quizName + "_" + quizType);

                res.DurationInMinutes = (definition.Value.QuizDurationType.ToLower() == "hours") ?
                                         (definition.Value.QuizDurationTime * 60) :
                                         (definition.Value.QuizDurationTime);
                res.Status = QuizStatus.Started.ToString();
                if (definition.Value.ShuffleQuestions)
                {
                    response.Value.Questions = response.Value.Questions.OrderBy(item => new Random().Next()).ToList();
                }

                response.Value.Questions = response.Value.Questions.Take(definition.Value.NoOfQuestions).ToList();

                foreach (var item in response.Value.Questions)
                {
                    item.Score = 0;
                    item.Answer = new string(item.Answer.ToCharArray().Select(x => (x == ' ') ? ' ' : '*').ToArray());
                    if (item.IsImageneeded)
                    {
                        if (!string.IsNullOrWhiteSpace(item.ImageName))
                        {
                            if (!item.ImageName.ToLower().StartsWith("http"))
                            {
                                item.ImagePath = host + item.ImageName;
                            }
                            else
                            {
                                item.ImagePath = item.ImageName;
                            }
                        }
                    }
                    QuizResultDetails quizResultDetails = new QuizResultDetails();
                    quizResultDetails.QuestionSet = item;
                    res.QuizResultDetails.Add(quizResultDetails);
                }

                await CouchbaseHelper.CouchbaseClient.UpsertAsync(quizName + "_" + quizType + "_" + teamName, res);
                return Ok(res);
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
                string webRootPath = _hostingEnvironment.WebRootPath;
                string contentRootPath = _hostingEnvironment.ContentRootPath;

                var parsedContentDisposition = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
                var filename = Path.Combine(webRootPath, _imagePath.Trim(), parsedContentDisposition.FileName.Trim().ToString());

                var filePath = filename;
                if (file.Length > 0)
                {
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                }

                var host = imageBaseUrl + "images/";

                var fullpath = "{\"fullpath\":\"" + Path.Combine(host, file.FileName) + "\"}";
                return Ok(fullpath);
            }
            catch (Exception e)
            {
                return Ok(false);
            }
        }
    }
}