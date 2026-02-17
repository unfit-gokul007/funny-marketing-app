import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ cartItems = [], setCartItems }) {
 
  const [openCart, setOpenCart] = useState(false);

  return (
  <>
    <nav className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 shadow-lg sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo Section */}
        <Link 
          to="/" 
          className="text-2xl font-extrabold text-white tracking-wide hover:scale-105 transition"
        >
          😂 Funny Market
        </Link>

        {/* Right Buttons */}
        <div className="flex items-center space-x-6">

          {/* Cart Icon */}
          <div 
            className="relative cursor-pointer"
            onClick={() => setOpenCart(true)}
          >
            <span className="text-2xl">🛒</span>

            {cartItems?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>

          <Link
            to="/"
            className="bg-white text-red-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Home
          </Link>

          <Link
            to="/admin"
            className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Admin
          </Link>

        </div>
      </div>

    </nav>

    {/* CART DRAWER */}
    {openCart && (
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-6 z-50">

        <h2 className="text-xl font-bold mb-4">Your Cart 🛒</h2>

        {cartItems?.length === 0 ? (
          <p>No items added</p>
        ) : (
          <>
            {cartItems.map((item, index) => (
  <div key={index} className="flex justify-between items-center mb-4">

    <div>
      <p className="font-semibold">{item.name}</p>
      <p className="text-sm text-gray-500">
        ₹{item.price} × {item.quantity}
      </p>
    </div>

    <div className="flex items-center space-x-2">

      {/* Decrease */}
      <button
        onClick={() =>
          setCartItems(prev =>
            prev.map(p =>
              p._id === item._id
                ? { ...p, quantity: Math.max(1, p.quantity - 1) }
                : p
            )
          )
        }
        className="bg-gray-200 px-2 rounded"
      >
        −
      </button>

      <span className="font-bold">{item.quantity}</span>

      {/* Increase */}
      <button
        onClick={() =>
          setCartItems(prev =>
            prev.map(p =>
              p._id === item._id
                ? { ...p, quantity: p.quantity + 1 }
                : p
            )
          )
        }
        className="bg-gray-200 px-2 rounded"
      >
        +
      </button>

      {/* Remove */}
      <button
        onClick={() =>
          setCartItems(prev =>
            prev.filter(p => p._id !== item._id)
          )
        }
        className="text-red-500 font-bold ml-2"
      >
        ✖
      </button>

    </div>

  </div>
))}

            <hr className="my-4" />

            <p className="font-bold">
              Total: ₹{cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
)}

            </p>
          </>
        )}

        <button
          onClick={() => setOpenCart(false)}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Close
        </button>

      </div>
    )}

  </>
);
}
