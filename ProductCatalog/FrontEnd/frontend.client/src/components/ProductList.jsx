import React from "react";
import "./ProductList.css";

const ProductList = ({ products, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Product Catalog</h2>
            <div className="product-list-wrapper">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        {product.imageUrl && (
                            <img
                                src={`data:image/png;base64,${product.imageUrl}`}
                                alt={product.name}
                                width="150"
                            />
                        )}
                        <p>{product.description}</p>
                        <p><strong>₱{product.price}</strong> | Stock: {product.stock}</p>
                        <button onClick={() => onEdit(product)}>Edit</button>
                        <button onClick={() => onDelete(product.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
