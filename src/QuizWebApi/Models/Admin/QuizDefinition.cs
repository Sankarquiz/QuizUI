using System;
using System.Collections.Generic;

namespace QuizWebApi.Models.Admin
{
    /// <summary>
    /// 
    /// </summary>
    public class QuizDefinition
    {
        public QuizDefinition()
        {
            SponserList = new List<SponserDetail>();
        }
        public string DocumentType { get; set; }
        public string QuizName { get; set; }
        public string QuizDomainHost { get; set; }
        public string QuizType { get; set; }
        public int NoOfQuestions { get; set; }
        public int NoOfParticipants { get; set; }
        public int QuizDurationTime { get; set; }
        public string QuizDurationType { get; set; }
        public DateTime QuizStartTime { get; set; }
        public DateTime QuizEndTime { get; set; }
        public bool ShuffleQuestions { get; set; }
        public bool IsQuizFromLargerPool { get; set; }
        public int NoOfQuestionsInPool { get; set; }
        public bool AllowConcurrentAccess { get; set; }
        public string ParticipantType { get; set; }
        public bool IsQuizAutoEvaluate { get; set; }
        public bool ShowScoreAfterAttempt { get; set; }
        public bool PostScoreOnSocialMedia { get; set; }
        public string Status { get; set; }
        public string Stage { get; set; }
        public string MessageBeforeQuizTime { get; set; }
        public string MessageAfterQuizTime { get; set; }
        public RegistrationFields RegistrationFields { get; set; }
        public List<SponserDetail> SponserList { get; set; }
    }
}
