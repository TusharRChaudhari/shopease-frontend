import React, { useEffect, useState } from "react";
import { apiGet, apiPost, getToken } from "../api";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("Loading products...");

  useEffect(() => {
    // Test 1: Direct fetch (no auth needed for products)
    fetch("http://localhost:8080/products")
      .then(res => {
        console.log("Direct fetch status:", res.status);
        return res.json();
      })
      .then(data => {
        console.log("Direct fetch data:", data);
        setProducts(data || []);
        setMessage(data && data.length > 0 ? "" : "No products found");
      })
      .catch(err => {
        console.error("Direct fetch error:", err);
        setMessage("Direct fetch failed: " + err.message);
      });

    // Test 2: Through api.js
    apiGet("/products")
      .then(data => {
        console.log("API.js data:", data);
      })
      .catch(err => {
        console.error("API.js error:", err);
      });
  }, []);

  const handleAddToCart = async (productId) => {
    if (!getToken()) {
      setMessage("Please login to add to cart");
      return;
    }
    try {
      await apiPost("/cart/add", { productId, quantity: 1 });
      setMessage("Added to cart");
    } catch (err) {
      setMessage("Failed to add to cart: " + err.message);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <p style={{color: message.includes("failed") ? 'red' : 'blue'}}>{message}</p>
      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
            <div><strong>{p.name}</strong></div>
            <div>{p.description}</div>
            <div>Price: ₹{p.price}</div>
            <button onClick={() => handleAddToCart(p.id)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsPage;
