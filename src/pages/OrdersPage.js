import React, { useEffect, useState } from "react";
import { apiGet } from "../api";

function OrdersPage() {
const [orders, setOrders] = useState([]);
const [message, setMessage] = useState("");

useEffect(() => {
apiGet("/orders")
.then((data) => {
setOrders(data || []);
})
.catch((err) => {
setMessage(err.message || "Failed to load orders");
});
}, []);

return (
<div>
<h2>Your Orders</h2>
{message && <p>{message}</p>}
<ul>
{orders.map((o) => (
<li key={o.id} style={{ marginBottom: "1rem" }}>
<div>Order #{o.id}</div>
<div>Status: {o.status}</div>
<div>Total: ₹{o.totalAmount}</div>
</li>
))}
</ul>
</div>
);
}

export default OrdersPage;