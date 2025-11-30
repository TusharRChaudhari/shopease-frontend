import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPut, apiDelete } from "../api";

function CartPage() {
  const [cart, setCart] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const loadCart = () => {
    apiGet("/cart")
      .then((data) => {
        setCart(data);
      })
      .catch((err) => {
        setMessage(err.message || "Failed to load cart");
      });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleUpdateQty = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      await apiPut("/cart/update/" + itemId, { quantity });
      loadCart();
    } catch (err) {
      setMessage(err.message || "Failed to update cart item");
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await apiDelete("/cart/remove/" + itemId);
      loadCart();
    } catch (err) {
      setMessage(err.message || "Failed to remove cart item");
    }
  };

  const handleCheckout = () => {
    navigate("/payment", { state: { total: cart ? cart.totalPrice : 0 } });
  };

  if (!cart) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {message && <p>{message}</p>}
      <ul>
        {cart.cartItems && cart.cartItems.map((ci) => (
          <li key={ci.id} style={{ marginBottom: "1rem" }}>
            <div>{ci.product ? ci.product.name : "Product"}</div>
            <div>Price: ₹{ci.price}</div>
            <div>
              Qty:
              <input
                type="number"
                min="1"
                value={ci.quantity}
                onChange={(e) =>
                  handleUpdateQty(ci.id, Number(e.target.value))
                }
                style={{ width: "60px", marginLeft: "0.5rem" }}
              />
            </div>
            <button onClick={() => handleRemove(ci.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ₹{cart.totalPrice}</h3>
      <button
        onClick={handleCheckout}
        disabled={!cart.cartItems || cart.cartItems.length === 0}
      >
        Proceed to Payment
      </button>
    </div>
  );
}

export default CartPage;
