import React, { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://lpucart-u7u9.onrender.com/verse/products");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Converted `axios.post` to `fetch`
  const addProductToCart = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to add products to the cart.");
        return;
      }

      const response = await fetch("https://lpucart-u7u9.onrender.com/verse/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Product added:", data);
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
      alert("Failed to add product to cart.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Product List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <div key={product._id?.$oid || product._id} style={styles.card}>
              <img src={product.image} alt={product.name} style={styles.image} />
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Cost: {product.cost} Rupees</p>
              <p>Rating: {product.rating}</p>
              <button
                onClick={() => addProductToCart(product._id?.$oid || product._id, 1)}
                style={styles.button}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ✅ Styling remains the same
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  heading: { marginBottom: "20px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    background: "lightgrey",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  button: {
    textDecoration: "none",
    color: "#fff",
    background: "brown",
    padding: "8px 12px",
    borderRadius: "5px",
    display: "inline-block",
    marginTop: "10px",
    cursor: "pointer",
  },
};

export default ProductsPage;
