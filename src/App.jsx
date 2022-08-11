import React, { useEffect } from "react";
import { ReactDOM } from "react";
import "./App.css";
import StorePage from "./pages/StorePage";
import { Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import Header from "./pages/Header";
import Footer from "./pages/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/store-page" element={<StorePage />} />
        <Route path="/cart-page" element={<CartPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
