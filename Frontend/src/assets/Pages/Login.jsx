import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./css/Formcss.css"
function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Both email and password are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8082/verse/auth/login", {
        email,
        password,
      });

      login(response.data.tokens.access.token);
      // console.log(response)
      alert("Login successful!");
      navigate("/products");
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="Formcontainer">
      <form>
        <p className="signup">Login</p>
        <div className="input-container">
        <input  type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-container">
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="button"className="btn"  onClick={handleLogin}>Login</button>
        <p>Don't have an account? <Link to="/">Signup</Link></p>
      </form>
    </div>
  );
}

export default Login;
