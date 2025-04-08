import React, { useState, useEffect } from "react";
import "./ProductForm.css";

const ProductForm = ({ onSubmit, initialData }) => {
    const emptyProduct = {
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: ""
    };

    const [product, setProduct] = useState(initialData || emptyProduct);

    useEffect(() => {
        setProduct(initialData || emptyProduct);
    }, [initialData]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1];
            setProduct(prev => ({ ...prev, imageUrl: base64String }));
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedProduct = {
            ...product,
            price: parseFloat(product.price),
            stock: parseInt(product.stock),
        };
        onSubmit(formattedProduct);
        setProduct(emptyProduct);
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>{initialData ? "Edit Product" : "Add Product"}</h2>
            <input name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
            <input name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
            <input name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} required />
            <input name="stock" type="number" placeholder="Stock" value={product.stock} onChange={handleChange} required />
            <input name="category" placeholder="Category" value={product.category} onChange={handleChange} required />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button type="submit">{initialData ? "Update" : "Add"}</button>
        </form>
    );
};

export default ProductForm;
