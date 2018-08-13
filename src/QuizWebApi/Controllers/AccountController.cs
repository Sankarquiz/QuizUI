using Couchbase.N1QL;
using Microsoft.AspNetCore.Mvc;
using QuizWebApi.Models.User;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizWebApi.Controllers
{
    [Route("api/quiz/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Register([FromBody]UserRegistration user)
        {
            var response = await CouchbaseHelper.CouchbaseClient.GetByKeyAsync<UserRegistration>(user.TeamName);
            if (response.Success || !string.IsNullOrEmpty(response?.Value?.TeamName))
                return Ok("Username already Exists.Please try with different.");

            var result = await CouchbaseHelper.CouchbaseClient.UpsertAsync(user.TeamName, user);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> Login(string username, string password)
        {
            var parameters = new Dictionary<string, object>();
            var query = string.Format(@"SELECT {0}.* FROM {0} WHERE  teamName = $teamName and `password` = $password", CouchbaseHelper.Bucket);
            parameters.Add("$teamName", username);
            parameters.Add("$password", password);
            var req = new QueryRequest(query);
            req.AddNamedParameter(parameters.ToArray());
            var result = await CouchbaseHelper.CouchbaseClient.GetByQueryAsync<UserRegistration>(req);
            if (result.Count > 0)
            {
                return Ok(result);
            }

            return Unauthorized();
        }
    }
}