import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#333", color: "white" }}>
      <h2>MyShop</h2>
      <div style={{ display: "flex", gap: "15px" }}>
        {isLoggedIn ? (
          <>
            <Link to="/home" style={{color : "white"}}>Home</Link>
            <Link to="/products" style={{color : "white"}}>Products</Link>
            <Link to="/cart" style={{color : "white"}}>Cart</Link>
            <button onClick={handleLogout} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{color : "white"}}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
