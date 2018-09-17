//using QuizWebApi.Models.Admin;
//using QuizWebApi.Models.QuizRunner;
//using System;
//using System.Linq;
//using System.Threading.Tasks;

//namespace QuizWebApi.Business
//{
//    /// <summary>
//    /// 
//    /// </summary>
//    public class RunnerBC
//    {
//        /// <summary>
//        /// Saves the quiz runner.
//        /// </summary>
//        /// <param name="quizName">Name of the quiz.</param>
//        /// <param name="quizType">Type of the quiz.</param>
//        /// <param name="teamName">Name of the team.</param>
//        /// <param name="email">The email.</param>
//        /// <param name="status">The status.</param>
//        /// <param name="request">The request.</param>
//        /// <returns></returns>
//        public async Task<bool> SaveQuizRunner(string quizName, string quizType, string teamName, string email, string status, QuizResultDetails request)
//        {
//            QuizResult result;
//            var admindata = (await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizQuestions>(quizName + "_" + quizType + "_" + "questions"))
//                .Value.Questions.FirstOrDefault(x => x.QuestionNo == request.QuestionSet.QuestionNo);
//            var SavedResult = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<QuizResult>(quizName + "_" + quizType + "_" + teamName);
//            if (SavedResult.Success && SavedResult?.Value != null)
//            {
//                if (admindata != null)
//                {
//                    result = SavedResult.Value;
//                    if (result.QuizResultDetails.FirstOrDefault(x => x.QuestionSet.QuestionNo == request.QuestionSet.QuestionNo) != null)
//                    {
//                        var index = result.QuizResultDetails.FindIndex(x =>
//                         x.QuestionSet.QuestionNo == request.QuestionSet.QuestionNo);
//                        if (result.QuizResultDetails[index].UserAnswer.ToLower() ==
//                           request.UserAnswer.ToLower())
//                        {
//                            return true;
//                        }
//                        else if (result.QuizResultDetails[index].UserAnswer.ToLower() == admindata.Answer.ToLower() &&
//                        request.UserAnswer.ToLower() != admindata.Answer.ToLower())
//                        {
//                            result.TotalScored -= admindata.Score;
//                            result.NumberOfCorrectAnswers--;
//                            result.NumberOfWrongAnswers++;
//                        }
//                        else if (result.QuizResultDetails[index].UserAnswer.ToLower() != admindata.Answer.ToLower() &&
//                        request.UserAnswer.ToLower() == admindata.Answer.ToLower())
//                        {
//                            result.TotalScored += admindata.Score;
//                            result.NumberOfCorrectAnswers++;
//                            result.NumberOfWrongAnswers--;
//                        }
//                        result.QuizResultDetails[index] = request;
//                    }
//                    else
//                    {
//                        request.AdminScore = admindata.Score;
//                        if (request.UserAnswer.ToLower() == admindata.Answer.ToLower())
//                        {
//                            result.TotalScored += admindata.Score;
//                            result.NumberOfCorrectAnswers++;
//                            request.UserScored = admindata.Score;
//                        }
//                        else
//                        {
//                            result.NumberOfWrongAnswers++;
//                        }
//                        result.QuizResultDetails.Add(request);
//                    }
//                    result.Status = status;
//                }
//            }
//            else
//            {
//                result = new QuizResult();
//                result.TeamName = teamName;
//                result.QuizName = quizName;
//                result.QuizType = quizType;
//                result.Email = email;
//                result.QuizStartTime = DateTime.UtcNow;
//                result.Status = QuizStatus.Started.ToString();
//                if (admindata != null)
//                {
//                    request.AdminScore = admindata.Score;
//                    if (request.UserAnswer.ToLower() == admindata.Answer.ToLower())
//                    {
//                        result.TotalScored += admindata.Score; ;
//                        result.NumberOfCorrectAnswers++;
//                        request.UserScored = admindata.Score;
//                    }
//                    else
//                    {
//                        result.NumberOfWrongAnswers++;
//                    }
//                }
//                result.QuizResultDetails.Add(request);
//            }

//            var response = await CouchbaseHelper.CouchbaseClient.UpsertAsync(quizName + "_" + quizType + "_" + teamName, result);
//            return response;
//        }
//    }
//}
