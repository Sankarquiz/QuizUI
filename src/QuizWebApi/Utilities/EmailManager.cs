using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using QuizWebApi.Models.Common;
using System;

namespace QuizWebApi.Utilities
{
    public class EmailManager
    {
        private SMTPConfig smtpconfig;
        private DomainConfig domainconfig { get; set; }
        private IHostingEnvironment Environment { get; set; }
        private HttpContext Context { get; set; }
        public EmailManager(IOptions<SMTPConfig> smtpConfig, IOptions<DomainConfig> domainConfig, IHostingEnvironment environment, IHttpContextAccessor httpContextAccessor)
        {
            smtpconfig = smtpConfig.Value;
            domainconfig = domainConfig.Value;
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
            string url = domainconfig.ActivationUrl;
            return url;
        }

        public bool RegisterQuiz(string fromuser, string touser, string teamname, string quizname, string toemail)
        {
            bool retval = true;
            try
            {
                //   string ecrEmail = CryptoEngine.Encrypt(email);
                string url = domainconfig.HomeUrl; // BaseURL() + "/ActivateSignUp/";  // TO DO
                string msg = Templates.RegisterTemplate(touser, fromuser, teamname, quizname, url);
                SMTPMessage stmpMsg = new SMTPMessage(smtpconfig, toemail, msg);
                retval = QuizEmail.SendMail(stmpMsg, "Knowledge vyasa Registration");
            }
            catch (Exception ex)
            {
                return false;
            }
            return retval;
        }

        public bool SignUpEmail(string username, string email, string password)
        {
            bool retval = true;
            try
            {
                string ecrEmail = CryptoEngine.Encrypt(email);
                string activateurl = domainconfig.ActivationUrl + ecrEmail;
                string msg = Templates.SingUpTemplate(username, email, password, activateurl);
                SMTPMessage stmpMsg = new SMTPMessage(smtpconfig, email, msg);
                retval = QuizEmail.SendMail(stmpMsg, "Knowledge vyasa Registration");
            }
            catch (Exception ex)
            {
                return false;
            }
            return retval;
        }

    }
}
