using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizWebApi.Utilities
{
    public static class Util
    {
        public static string URLPath(this string str,string path)
        {
            return (str.EndsWith("/") ? (str.Trim() + path.Trim()) : (str.Trim() + "/" + path.Trim()));
        }
        private static Random random = new Random();
        private static  int RANDOMLENGTH = 6;
        private static string DATETIMEFORMAT= "dd-MM-yyyy-HH-mm-ss";
        public static string RandomString()
        {
            return RandomString(RANDOMLENGTH);
        }
        public static string ToStringTimeNow()
        {
            return DateTime.Now.ToString(DATETIMEFORMAT);            
        }
        public static DateTime ToTimeFromString(string dt)
        {
            return DateTime.ParseExact(dt,DATETIMEFORMAT,null);
        }
        public static bool IsTimeExpired(string datetime, double seconds=30)
        {
            return IsTimeExpired(ToTimeFromString(datetime), seconds);
        }
        public static bool IsTimeExpired(DateTime datetime, double seconds)
        {
            DateTime cdt = datetime.AddSeconds(seconds);
            DateTime ndt = DateTime.Now;
            if( 0 >= ndt.CompareTo(cdt) )
            return true;

            return false;
        }
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

    }
}
