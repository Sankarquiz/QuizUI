using QuizWebApi.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace QuizWebApi.Utilities
{
    public class QuizEmail
    {
        public static bool SendMail(SMTPMessage msg,string subject )
        {
            try
            {
                SmtpClient client = new SmtpClient(msg.Config.Server.Trim());
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(msg.Config.User.Trim(), msg.Config.Pass.Trim());
                client.EnableSsl = true;
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(msg.ToEmail.Trim());
                mailMessage.To.Add(msg.ToEmail.Trim());
                mailMessage.Body = msg.Message;
                mailMessage.Subject = subject;
                mailMessage.IsBodyHtml = false;
                client.Send(mailMessage);
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }
    }
}
