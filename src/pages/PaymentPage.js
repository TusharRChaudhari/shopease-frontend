import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { apiPost } from "../api";

function PaymentPage() {
  const location = useLocation();
  const total = location.state ? location.state.total : 0;
  const [addressId, setAddressId] = useState("");
  const [message, setMessage] = useState("");

  const handlePay = async () => {
    if (!addressId) {
      setMessage("Please enter address ID");
      return;
    }
    try {
      const data = await apiPost("/orders/place", {
        addressId: Number(addressId),
      });
      if (!data || !data.id) {
        setMessage("Failed to place order");
        return;
      }
      setMessage("Order placed successfully with id " + data.id);
    } catch (err) {
      setMessage(err.message || "Error placing order");
    }
  };

  return (
    <div>
      <h2>Payment</h2>
      <p>Cart total: ₹{total}</p>
      <p>
        This is a test payment screen. Later you can integrate a real payment gateway and call it here.
      </p>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>Address ID: </label>
        <input
          value={addressId}
          onChange={(e) => setAddressId(e.target.value)}
        />
      </div>
      <button onClick={handlePay}>Pay and Place Order</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PaymentPage;
