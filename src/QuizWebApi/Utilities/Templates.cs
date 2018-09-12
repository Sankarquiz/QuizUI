using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace QuizWebApi.Utilities
{
    public class Templates
    {

        public static string ResetTemplate(string name, string fcode, string reseturl)
        {
            string msg = string.Empty;
            msg = ReadTemplate(1);
            msg = msg.Replace("{{name}}", name)
                .Replace("{{fcode}}", fcode)                
                .Replace("{{url}}", reseturl);
            return msg;
        }
        public static string SingUpTemplate(string name, string email, string password, string activateurl)
        {
            string msg = string.Empty;
            msg = ReadTemplate(1);
            msg = msg.Replace("{{name}}", name)
                .Replace("{{email}}", email)
                .Replace("{{password}}", password)
                .Replace("{{url}}", activateurl);
            return msg;
        }

        public static string RegisterTemplate(string toname, string fromname, string teamname, string quizname, string url)
        {
            string msg = string.Empty;
            msg = ReadTemplate(2);
            msg = msg.Replace("{{name}}", toname).
                       Replace("{{cname}}", fromname).
                       Replace("{{tname}}", teamname).
                       Replace("{{quiz}}", quizname).
                       Replace("{{url}}", url);
            return msg;
        }
        public static string ReadTemplate(int index)
        {
            return ReadTemplate(TempFile(index));
        }

        public static string ReadTemplate(string filename)
        {
            string tmpstring = string.Empty;
            try
            {
                IHostingEnvironment env = GlobalConfig.Environment;
                string tpath = env.WebRootPath + Path.DirectorySeparatorChar.ToString() + "templates" + Path.DirectorySeparatorChar.ToString() + filename;
                tmpstring = File.ReadAllText(tpath);
                Console.WriteLine(tpath);
            }
            catch (Exception ex)
            {

            }
            return tmpstring;
        }
        private static string TempFile(int index)
        {
            string tstr = string.Empty;
            switch (index)
            {
                case 1:
                    tstr = "newregistration.html";
                    break;
                case 2:
                    tstr = "quizregistration.html";
                    break;
                case 3:
                    tstr = "forgotpasswd.html";
                    break;
            }
            return tstr;
        }

    }
}
