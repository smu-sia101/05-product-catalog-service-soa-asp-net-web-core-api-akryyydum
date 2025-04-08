using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Data;
using MongoDB.Driver;
using ProductCatalog.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductCatalog.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IMongoCollection<Product> _products;

        public ProductController(MongodbServices mongoDBServices)
        {
            _products = mongoDBServices.Database.GetCollection<Product>("products");
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> Get()
        {
            return await _products.Find(FilterDefinition<Product>.Empty).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product?>> GetById(string id)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.Id, id);
            var product = await _products.Find(filter).FirstOrDefaultAsync();
            return product != null ? Ok(product) : NotFound();
        }

        [HttpPost]
        [RequestSizeLimit(10_000_000)]
        public async Task<ActionResult> Create([FromBody] Product product)
        {
            await _products.InsertOneAsync(product);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] Product product)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.Id, product.Id);
            var result = await _products.ReplaceOneAsync(filter, product);
            return result.IsAcknowledged && result.ModifiedCount > 0 ? Ok() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.Id, id);
            var result = await _products.DeleteOneAsync(filter);
            return result.DeletedCount > 0 ? Ok() : NotFound();
        }
    }
}
