import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

function App() {

  // 🛒 Cart Count State
  const [cartItems, setCartItems] = useState([]);

  return (
    <BrowserRouter>

      {/* Pass cartCount to Navbar */}
      <Navbar 
  cartItems={cartItems} 
  setCartItems={setCartItems} 
/>
      <Routes>

        {/* Pass setCartCount to Home */}
        <Route 
          path="/" 
          element={<Home setCartItems={setCartItems} />} 
        />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
