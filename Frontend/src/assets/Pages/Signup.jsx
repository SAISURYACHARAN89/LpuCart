import React, { useState } from "react";
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
      const response = await fetch("https://lpucart-u7u9.onrender.com/verse/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Invalid request");
        } else if (response.status === 409) {
          throw new Error("Email is already registered.");
        } else {
          throw new Error("Something went wrong. Please try again.");
        }
      }

      const data = await response.json();
      const token = data.token?.access?.token;

      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("isLogged", "true"); // Store login state
        alert("Signup successful! Please login.");
        navigate("/products");
      } else {
        setErrorMessage("Token not received. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.message);
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
