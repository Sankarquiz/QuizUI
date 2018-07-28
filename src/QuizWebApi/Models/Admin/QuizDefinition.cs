using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace QuizWebApi.Models.Admin
{
    /// <summary>
    /// 
    /// </summary>
    public class QuizDefinition
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="QuizDefinition"/> class.
        /// </summary>
        public QuizDefinition()
        {
            QuestionSet = new List<QuizSet>();
        }
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement]
        public string QuizName { get; set; }

        [BsonElement]
        public string QuizDomainHost { get; set; }

        [BsonElement]
        public string QuizType { get; set; }

        [BsonElement]
        public int NoOfQuestions { get; set; }

        [BsonElement]
        public int NoOfParticipants { get; set; }

        [BsonElement]
        public int QuizDuration { get; set; }

        [BsonElement]
        public DateTime QuizStartTime { get; set; }

        [BsonElement]
        public DateTime QuizEndTime { get; set; }

        [BsonElement]
        public bool ShuffleQuestions { get; set; }

        [BsonElement]
        public bool IsQuizFromLargerPool { get; set; }

        [BsonElement]
        public int NoOfQuestionsInPool { get; set; }

        [BsonElement]
        public bool AllowConcurrentAccess { get; set; }

        [BsonElement]
        public string ParticipantType { get; set; }

        [BsonElement]
        public bool IsQuizAutoEvaluate { get; set; }

        [BsonElement]
        public bool ShowScoreAfterAttempt { get; set; }

        [BsonElement]
        public bool PostScoreOnSocialMedia { get; set; }

        [BsonElement]
        public string Status { get; set; }

        [BsonElement]
        public string Stage { get; set; }

        [BsonElement]
        public string RulesAndRegulations { get; set; }
        [BsonElement]
        public List<QuizSet> QuestionSet { get; set; }
    }
}
