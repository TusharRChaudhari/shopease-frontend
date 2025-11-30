import React, { useState } from "react";
import { apiPost } from "../api";

function RegisterPage() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("CUSTOMER");
const [message, setMessage] = useState("");

const handleSubmit = async (e) => {
e.preventDefault();
try {
const data = await apiPost("/auth/register", {
name,
email,
password,
role,
});
if (!data || !data.token) {
setMessage((data && data.message) || "Registration failed");
return;
}
localStorage.setItem("token", data.token);
setMessage("Registered and logged in");
window.location.href = "/";
} catch (err) {
setMessage(err.message || "Error registering");
}
};

return (
<div>
<h2>Register</h2>
<form onSubmit={handleSubmit}>
<div style={{ marginBottom: "0.5rem" }}>
<label>Name: </label>
<input
value={name}
onChange={(e) => setName(e.target.value)}
/>
</div>
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
<div style={{ marginBottom: "0.5rem" }}>
<label>Role: </label>
<select
value={role}
onChange={(e) => setRole(e.target.value)}
>
<option value="CUSTOMER">Customer</option>
<option value="ADMIN">Admin</option>
</select>
</div>
<button type="submit">Register</button>
</form>
{message && <p>{message}</p>}
</div>
);
}

export default RegisterPage;