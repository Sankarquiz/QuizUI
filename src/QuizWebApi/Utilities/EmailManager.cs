using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using QuizWebApi.Models.Common;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace QuizWebApi.Utilities
{
    public class EmailManager
    {
        private SMTPConfig smtpconfig;
        private IHostingEnvironment Environment { get; set; }
        private HttpContext Context { get; set; }
        public EmailManager(IOptions<SMTPConfig> smtpConfig, IHostingEnvironment environment, IHttpContextAccessor httpContextAccessor)
        {
            smtpconfig = smtpConfig.Value;
            Environment = environment;
            Context = httpContextAccessor.HttpContext; 
        }

        private string BaseURL(string append)
        {
            string str = BaseURL() + "/" + append.Trim();
            return str;
        }
        private string BaseURL()
        {
            //string url = Context.Request.Scheme + "://" + Context.Request.Host + "/" + "api/quiz";
            string url = "http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz";
            return url;
        }

        public bool RegisterQuiz(string fromuser, string touser, string teamname,string quizname, string toemail)
        {
            bool retval = true;
            try
            {
             //   string ecrEmail = CryptoEngine.Encrypt(email);
                string url = BaseURL() + "/ActivateSignUp/" ;  // TO DO
                string msg = Templates.RegisterTemplate(touser,fromuser,teamname,quizname, url);
                SMTPMessage stmpMsg = new SMTPMessage(smtpconfig, toemail, msg);
                retval = QuizEmail.SendMail(stmpMsg, "Knowledge vyasa Registration");
            }
            catch (Exception ex)
            {
                return false;
            }
            return retval;
        }

        public bool SignUpEmail(string username,string email)
        {
            bool retval = true;
            try
            {
                string ecrEmail = CryptoEngine.Encrypt(email);
                string activateurl =   BaseURL() + "/ActivateSignUp/"+ ecrEmail;                                                
                string msg = Templates.SingUpTemplate(username, activateurl);
                SMTPMessage stmpMsg = new SMTPMessage(smtpconfig, email, msg);
                retval = QuizEmail.SendMail(stmpMsg, "Knowledge vyasa Registration");
            }
            catch(Exception ex)
            {
                return false;
            }
            return retval;
        }

    }
}
