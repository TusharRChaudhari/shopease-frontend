import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import PaymentPage from "./pages/PaymentPage";
import { getToken } from "./api";

function ProtectedRoute({ children }) {
const token = getToken();
if (!token) {
return <Navigate to="/login" replace />;
}
return children;
}

function App() {
const token = getToken();

const handleLogout = () => {
localStorage.removeItem("token");
window.location.href = "/login";
};

return (
<Router>
<div>
<nav
style={{
display: "flex",
gap: "1rem",
padding: "1rem",
borderBottom: "1px solid #ccc",
}}
>
<Link to="/">Products</Link>
{token && <Link to="/cart">Cart</Link>}
{token && <Link to="/orders">Orders</Link>}
{!token && <Link to="/login">Login</Link>}
{!token && <Link to="/register">Register</Link>}
{token && (
<button onClick={handleLogout}>Logout</button>
)}
</nav>
<div style={{ padding: "1rem" }}>
<Routes>
<Route path="/" element={<ProductsPage />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
<Route
path="/cart"
element={
<ProtectedRoute>
<CartPage />
</ProtectedRoute>
}
/>
<Route
path="/orders"
element={
<ProtectedRoute>
<OrdersPage />
</ProtectedRoute>
}
/>
<Route
path="/payment"
element={
<ProtectedRoute>
<PaymentPage />
</ProtectedRoute>
}
/>
</Routes>
</div>
</div>
</Router>
);
}

export default App;