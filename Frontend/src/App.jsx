import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./assets/Pages/NavBar";
import ProductsPage from "./assets/Pages/ProductsPage";
import CartPage from "./assets/Pages/Cartpage";
import Login from "./assets/Pages/Login";
import SignupPage from "./assets/Pages/Signup";
import ProductDetails from "./assets/Pages/ProductDetails";
import Home from "./assets/Pages/Home";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userToken"));

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={<SignupPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
