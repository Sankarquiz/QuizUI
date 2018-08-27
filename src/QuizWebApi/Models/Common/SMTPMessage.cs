using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizWebApi.Models.Common
{
    public class SMTPMessage
    {
        public SMTPConfig Config { get; set; }
        public string ToEmail { get; set; }
        public string Message { get; set; }

        public SMTPMessage()
        {

        }

        public SMTPMessage(SMTPConfig config)
        {
            this.Config = config;
        }
        public SMTPMessage(SMTPConfig config,string to,string msg)
        {
            this.Config = config;
            this.ToEmail = to;
            this.Message = msg;
        }

    }
}
