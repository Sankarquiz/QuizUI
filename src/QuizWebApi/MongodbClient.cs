using MongoDB.Driver;

namespace QuizWebApi
{
    /// <summary>
    /// 
    /// </summary>
    public static class MongodbClient
    {
        /// <summary>
        /// Gets the mongo database.
        /// </summary>
        /// <returns></returns>
        public static IMongoDatabase GetMongoDatabase()
        {
            var mongoClient = new MongoClient("mongodb://localhost:27017");
            return mongoClient.GetDatabase("QuizDB");
        }
    }
}
