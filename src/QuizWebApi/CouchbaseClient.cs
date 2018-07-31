using Couchbase;
using Couchbase.Core;
using Couchbase.Logging;
using Couchbase.N1QL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CouchbaseLib = Couchbase;

namespace QuizWebApi
{
    public class CouchbaseClient : ICouchbaseClient
    {
        private static IBucket _bucket;
        private static string _cacheKeyPrefix;
        private readonly ILog _logger;
        /// <summary>
        /// Initializes a new instance of the <see cref="CouchbaseClient"/> class.
        /// </summary>
        /// <param name="bucket"></param>
        /// <param name="cacheKeyPrefix"></param>
        public CouchbaseClient(IBucket bucket, string cacheKeyPrefix = "")
        {
            _logger = LogManager.GetLogger(typeof(CouchbaseClient));
            _bucket = bucket;
            _cacheKeyPrefix = cacheKeyPrefix;
        }

        /// <summary>
        /// Upserts the asynchronous.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="id">The identifier.</param>
        /// <param name="content">The content.</param>
        /// <param name="expiration">The expiration.</param>
        /// <param name="container">The container.</param>
        /// <returns></returns>
        public async Task<bool> UpsertAsync<T>(string id, T content) where T : class
        {
            var result = await _bucket.UpsertAsync(id, content);

            if (!result.Success)
            {
                LogError(nameof(UpsertAsync), id, result);
            }
            return result.Success;
        }

        public async Task<IOperationResult<T>> AddAsync<T>(string key, T value, TimeSpan expiration)
        {
            return await _bucket.InsertAsync(key, value, expiration);
        }

        public async Task<IOperationResult<T>> GetByKeyAsync<T>(string key)
        {
            return await _bucket.GetAsync<T>(key);
        }

        public async Task<List<T>> GetByQueryAsync<T>(IQueryRequest query)
        {
            var result = await _bucket.QueryAsync<T>(query);
            if (!result.Success)
            {
                var errors = result.Errors.Select(er => er.Message).ToList();
                _logger.Error(string.Format("GetByQueryAsync Error [{2}]: [{0}], exception: [{1}]", string.Join(",", errors), result.Exception, query));
            }
            return result.Rows;
        }

        private void LogError(string methodName, string key, CouchbaseLib.IOperationResult result)
        {
            _logger.Error($"{methodName} failed for key[{key}. Error: {result.Message}. Status:{result.Status}", result.Exception);
        }
    }
}

