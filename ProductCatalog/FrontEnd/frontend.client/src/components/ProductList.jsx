import React from "react";

const ProductList = ({ products, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Product Catalog</h2>
            {products.map(product => (
                <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                    <h3>{product.name}</h3>
                    {product.imageUrl &&
                        <img src={`data:image/png;base64,${product.imageUrl}`} alt={product.name} width="150" />
                    }
                    <p>{product.description}</p>
                    <p><strong>₱{product.price}</strong> | Stock: {product.stock}</p>
                    <button onClick={() => onEdit(product)}>Edit</button>
                    <button onClick={() => onDelete(product.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
