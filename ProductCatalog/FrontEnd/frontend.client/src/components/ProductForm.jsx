import React, { useState, useEffect } from "react";

const ProductForm = ({ onSubmit, initialData }) => {
    const [product, setProduct] = useState(initialData || {
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: ""
    });

    useEffect(() => {
        if (initialData) setProduct(initialData);
    }, [initialData]);

    const handleFileChange = (e) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1];
            setProduct(prev => ({ ...prev, imageUrl: base64String }));
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(product);
        setProduct({ name: "", description: "", price: "", stock: "", imageUrl: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{initialData ? "Edit Product" : "Add Product"}</h2>
            <input name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
            <input name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
            <input name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} required />
            <input name="stock" type="number" placeholder="Stock" value={product.stock} onChange={handleChange} required />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button type="submit">{initialData ? "Update" : "Add"}</button>
        </form>
    );
};

export default ProductForm;
