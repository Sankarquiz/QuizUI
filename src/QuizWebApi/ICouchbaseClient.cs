using Couchbase;
using System;
using System.Threading.Tasks;

namespace QuizWebApi
{
    public interface ICouchbaseClient
    {
        Task<bool> UpsertAsync<T>(string id, T content) where T : class;
        Task<IOperationResult<T>> AddAsync<T>(string key, T value, TimeSpan expiration);
        Task<IOperationResult<T>> GetByKeyAsync<T>(string key);
    }
}