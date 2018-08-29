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
            string url = Context.Request.Scheme + "://" + Context.Request.Host + "/" + "api/quiz";
            return url;
        }

        public bool SignUpEmail(string username,string email)
        {
            bool retval = true;
            try
            {
                BaseURL();
                string ecrEmail = CryptoEngine.Encrypt(email);
                string aurl =Context.Request.Scheme + Path.PathSeparator + Context.Request.Host + Path.PathSeparator + Context.Request.PathBase;
                aurl = Environment.ApplicationName + Path.PathSeparator + ecrEmail;
                string msg = Templates.SingUpTemplate(username, aurl);
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
