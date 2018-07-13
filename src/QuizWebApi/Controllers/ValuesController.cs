//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc;
//using MongoDB.Bson;
//using MongoDB.Bson.Serialization.Attributes;
//using MongoDB.Driver;

//namespace QuizWebApi.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ValuesController : ControllerBase
//    {
//        private IMongoDatabase mongoDatabase;

//        //Generic method to get the mongodb database details  
//        public IMongoDatabase GetMongoDatabase()
//        {
//            var mongoClient = new MongoClient("mongodb://localhost:27017");
//            return mongoClient.GetDatabase("CustomerDB");
//        }


//        [HttpGet]
//        public IActionResult Index()
//        {
//            //Get the database connection  
//            mongoDatabase = GetMongoDatabase();
//            Customer c = new Customer
//            {
//                Address = "sonata",
//                CustomerId = 1,
//                CustomerName = "sankar"                
//            };
//            mongoDatabase.GetCollection<Customer>("test").InsertOne(c);
//            //fetch the details from CustomerDB and pass into view  
//            var result = mongoDatabase.GetCollection<Customer>("test").Find(FilterDefinition<Customer>.Empty).ToList();
//            return Ok(result);
//        }
//    }

//    public class Customer
//    {
//        [BsonId]
//        public ObjectId Id { get; set; }
//        [BsonElement]
//        public int CustomerId { get; set; }
//        [BsonElement]
//        public string CustomerName { get; set; }
//        [BsonElement]
//        public string Address { get; set; }
//    }
//}
