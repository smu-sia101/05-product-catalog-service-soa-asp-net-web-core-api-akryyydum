using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Data;
using MongoDB.Driver;
using ProductCatalog.Data.Entities;
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
            var customer = _products.Find(filter).FirstOrDefault();
            return customer != null ? Ok(customer) : NotFound();
        }
        [HttpPost]
        public async Task<ActionResult> Create(Product product)
        {
            await _products.InsertOneAsync(product);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }
        [HttpPut]
        public async Task<ActionResult> Update(Product product)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.Id, product.Id);
            //var update = Builders<Product>.Update
                //.Set(p => p.Name, product.Name)
                //.Set(p => p.Price, product.Price)
                //.Set(p => p.Description, product.Description)
                //.Set(p => p.Category, product.Category)
                //.Set(p => p.Stock, product.Stock)
                //.Set(p => p.ImageUrl, product.ImageUrl);
            //var result = await _products.UpdateOneAsync(filter, update);
            //return result.IsAcknowledged ? NoContent() : NotFound();
            await _products.ReplaceOneAsync(filter, product);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.Id, id);
            await _products.DeleteOneAsync(filter);
            return Ok();    
        }
    }
}
