import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch("https://lpucart-u7u9.onrender.com/verse/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      // console.log(data)
      setCart(data.cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (productId, quantity) => {
    if (!token) {
      console.error("No auth token found. User is not authenticated.");
      return;
    }

    const data = { productId, quantity };

    try {
      const response = await fetch("https://lpucart-u7u9.onrender.com/verse/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // ✅ Fix: Add Content-Type header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // ✅ Read error message from backend
        throw new Error(`Failed to update cart: ${errorMessage}`);
      }

      console.log("Cart updated successfully");
      fetchCart(); // ✅ Refresh cart after update
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
  };

  const checkout = async () => {
    try {
      const res  = await fetch("https://lpucart-u7u9.onrender.com/verse/cart/checkout", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Checkout successful!");
      fetchCart();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Cart 🛒</h2>
      {loading ? (
        <p>Loading...</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={styles.cartList}>
          {cart.map((item) => (
            <div key={item.product._id} style={styles.cartItem}>
              <img
                src={item.product.image}
                alt={item.product.name}
                style={styles.image}
              />
              <div>
                <h3>{item.product.name}</h3>
                <p>Price: {item.product.cost} Rupees</p>
                <p>Quantity: {item.quantity}</p>
                <button
                  onClick={() =>
                    updateCart(item.product._id, item.quantity + 1)
                  }
                  style={styles.button}
                >
                  ➕
                </button>
                <button
                  onClick={() =>
                    updateCart(item.product._id, item.quantity - 1)
                  }
                  style={styles.button}
                >
                  ➖
                </button>
                <button
                  onClick={() => updateCart(item.product._id, 0)}
                  style={styles.removeButton}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
          <button onClick={checkout} style={styles.checkoutButton}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center" },
  heading: { marginBottom: "20px" },
  cartList: { display: "flex", flexDirection: "column", gap: "15px" },
  cartItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  button: {
    background: "green",
    color: "white",
    padding: "5px 10px",
    margin: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  removeButton: {
    background: "red",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  checkoutButton: {
    background: "blue",
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default CartPage; 