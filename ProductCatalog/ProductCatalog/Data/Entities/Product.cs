﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ProductCatalog.Data.Entities
{
    public class Product
    {
        [BsonId] // tells MongoDB this is the _id field
        [BsonRepresentation(BsonType.ObjectId)] // allows passing it as a string
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();


        [BsonElement("name"), BsonRepresentation(BsonType.String)]
        public string Name { get; set; }

        [BsonElement("price"), BsonRepresentation(BsonType.Decimal128)]
        public decimal Price { get; set; }

        [BsonElement("description"), BsonRepresentation(BsonType.String)]
        public string Description { get; set; }

        [BsonElement("category"), BsonRepresentation(BsonType.String)]
        public string Category { get; set; }

        [BsonElement("stock"), BsonRepresentation(BsonType.Int32)]
        public int Stock { get; set; }

        [BsonElement("image")]
        public string ImageUrl { get; set; }
    }
}
