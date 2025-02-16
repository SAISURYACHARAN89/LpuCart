import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { backendContext } from "./AuthContext";
const ProductDetails = () => {
  const {backendurl} = useContext(backendContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching product with ID:", productId); // Debugging log

    if (!productId) {
      console.error("No product ID found in URL.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${backendurl}/verse/products/${productId}`
        );
        console.log("API Response:", response.data); // Debugging log

        if (response.data) {
          setProduct(response.data);
        } else {
          console.warn("Product not found in API response.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div style={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : product ? (
        <>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} style={styles.image} />
          <p>Category: {product.category}</p>
          <p>Cost: ${product.cost}</p>
          <p>Rating: {product.rating}</p>
        </>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center" },
  image: { width: "300px", height: "300px", objectFit: "cover", borderRadius: "8px" }
};

export default ProductDetails;
