using Couchbase.Core;

namespace QuizWebApi
{
    public class CouchbaseHelper
    {
        /// <summary>
        /// The couchbase client
        /// </summary>
        public static CouchbaseClient CouchbaseClient;

        /// <summary>
        /// Initializes the specified bucket.
        /// </summary>
        /// <param name="bucket">The bucket.</param>
        public static void Initialize(IBucket bucket)
        {
            CouchbaseClient = new CouchbaseClient(bucket);
            Bucket = bucket.Name;
        }

        /// <summary>
        /// Gets the bucket.
        /// </summary>
        /// <value>
        /// The bucket.
        /// </value>
        public static string Bucket { get; private set; }

    }
}
