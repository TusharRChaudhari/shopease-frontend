import React, { useState } from "react";
import { apiPost } from "../api";

function LoginPage() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const handleSubmit = async (e) => {
e.preventDefault();
try {
const data = await apiPost("/auth/login", { email, password });
if (!data || !data.token) {
setMessage((data && data.message) || "Login failed");
return;
}
localStorage.setItem("token", data.token);
setMessage("Login successful");
window.location.href = "/";
} catch (err) {
setMessage(err.message || "Error logging in");
}
};

return (
<div>
<h2>Login</h2>
<form onSubmit={handleSubmit}>
<div style={{ marginBottom: "0.5rem" }}>
<label>Email: </label>
<input
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
</div>
<div style={{ marginBottom: "0.5rem" }}>
<label>Password: </label>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
</div>
<button type="submit">Login</button>
</form>
{message && <p>{message}</p>}
</div>
);
}

export default LoginPage;