import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Pages/css/Formcss.css";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setErrorMessage("All fields are required");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      return;
    }
  
    setErrorMessage("");
    setLoading(true);
  
    try {
      const response = await axios.post("https://lpucart-u7u9.onrender.com/verse/auth/register", {
        name,
        email,
        password,
      });
      console.log(response)
      // ✅ Store only the token string
      const token = response.data.token.access.token;
      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("isLogged", "true"); // Store login state
        alert("Signup successful! Please login.");
        navigate("/products");
      } else {
        setErrorMessage("Token not received. Please try again.");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMessage(error.response.data.error || "Invalid request");
      } else if (error.response?.status === 409) {
        setErrorMessage("Email is already registered.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="Formcontainer">
      <form onSubmit={(e) => e.preventDefault()}>
        <p className="signup">Signup</p>

        <div className="input-container">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="button" className="btn" onClick={handleSignup} disabled={loading}>
          {loading ? "Signing Up..." : "Signup"}
        </button>

        <p>
          Already have an account? <Link to="/login" className="login-link">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
