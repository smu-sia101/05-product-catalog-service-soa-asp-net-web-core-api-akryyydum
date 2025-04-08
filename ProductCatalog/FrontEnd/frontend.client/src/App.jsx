import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ErrorBanner from "./components/ErrorBanner";

const API_BASE = "https://localhost:7240/api/Product";

function App() {    
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(API_BASE);
            setProducts(res.data);
            setError("");
        } catch (err) {
            setError("Failed to fetch products.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (product) => {
        try {
            if (product.id) {
                await axios.put(API_BASE, product);
            } else {
                await axios.post(API_BASE, product);
            }
            fetchProducts();
            setEditingProduct(null);
        } catch (err) {
            setError("Failed to save product.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE}/${id}`);
            fetchProducts();
        } catch (err) {
            setError("Failed to delete product.");
        }
    };

    return (
        <div className="App" style={{ padding: "20px" }}>
            <ErrorBanner message={error} />
            <ProductForm onSubmit={handleSubmit} initialData={editingProduct} />
            <ProductList products={products} onEdit={setEditingProduct} onDelete={handleDelete} />
        </div>
    );
}

export default App;
