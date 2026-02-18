import { useState } from "react";
import axios from "axios";

export default function OrderModal({ product, close }) {
  const [form, setForm] = useState({
    quantity: 1,
    customerName: "",
    phoneNumber: ""
  });

  const submitOrder = async () => {
    try {
      await axios.post("https://funny-marketing-app.onrender.com/api/orders", {
        productId: product._id,
        quantity: form.quantity,
        customerName: form.customerName,
        phoneNumber: form.phoneNumber
      });

      alert("Order sent successfully 🎉");
      close();
    } catch (error) {
      console.error(error);
      alert("Order failed ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-80 shadow-lg">

        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600">Price: ₹{product.price}</p>

        {/* Quantity */}
        <label className="block mt-3 text-sm font-medium">Quantity</label>
        <input
          type="number"
          min="1"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: Number(e.target.value) })
          }
          className="border p-2 w-full mt-1 rounded"
        />

        {/* Name */}
        <label className="block mt-3 text-sm font-medium">Your Name</label>
        <input
          type="text"
          value={form.customerName}
          onChange={(e) =>
            setForm({ ...form, customerName: e.target.value })
          }
          className="border p-2 w-full mt-1 rounded"
        />

        {/* Phone */}
        <label className="block mt-3 text-sm font-medium">Phone Number</label>
        <input
          type="text"
          value={form.phoneNumber}
          onChange={(e) =>
            setForm({ ...form, phoneNumber: e.target.value })
          }
          className="border p-2 w-full mt-1 rounded"
        />

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={close}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={submitOrder}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
