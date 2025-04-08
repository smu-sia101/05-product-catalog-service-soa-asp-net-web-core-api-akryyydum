using MongoDB.Driver;

namespace ProductCatalog.Data
{
    public class MongodbServices
    {
        private readonly IConfiguration _configuration;
        private readonly IMongoDatabase _database;
        public MongodbServices(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            var connectionString = _configuration.GetConnectionString("DbConnection");
            var mongoUrl = MongoUrl.Create(connectionString);
            var mongoClient = new MongoClient(mongoUrl);
            _database = mongoClient.GetDatabase(mongoUrl.DatabaseName);
        }

        public IMongoDatabase? Database => _database;

    }
}
