using Microsoft.AspNetCore.Hosting;
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
        public IHostingEnvironment Environment { get; set; }
        public EmailManager(IOptions<SMTPConfig> smtpConfig, IHostingEnvironment environment)
        {
            smtpconfig = smtpConfig.Value;
            Environment = environment;
        }

        public bool SignUpEmail(string name,string email)
        {
            bool retval = true;
            try
            {
                string ecrEmail = CryptoEngine.Encrypt(email);
                string aurl = Environment.ApplicationName + Path.PathSeparator + ecrEmail;
                string msg = Templates.SingUpTemplate(name, aurl);
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
