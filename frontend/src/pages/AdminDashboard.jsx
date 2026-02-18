import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: ""
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/admin");
    } else {
      fetchProducts();
    }
  }, [token]);

  const fetchProducts = async () => {
    const res = await axios.get("https://funny-marketing-app.onrender.com/api/products");
    setProducts(res.data);
  };

  // 🟢 Add Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("stock", form.stock);
    formData.append("image", image);

    await axios.post("https://funny-marketing-app.onrender.com/api/products", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data"
      }
    });

    alert("Product Added 🎉");
    setForm({ name: "", price: "", description: "", stock: "" });
    setImage(null);
    fetchProducts();
  };

  // 🟢 Delete Product
  const deleteProduct = async (id) => {
    await axios.delete(`https://funny-marketing-app.onrender.com/api/products/${id}`, {
      headers: { Authorization: token }
    });
    fetchProducts();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold mb-4">Admin Dashboard 📊</h2>

      {/* 🔥 Add Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <h3 className="text-lg font-bold mb-2">Add New Product</h3>

        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 w-full mb-2"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full mb-2"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-2"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Stock"
          className="border p-2 w-full mb-2"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: e.target.value })
          }
        />

        <input
          type="file"
          className="border p-2 w-full mb-2"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>

      {/* 🔥 Product List */}
      <div>
        <h3 className="text-lg font-bold mb-2">All Products</h3>

        {products.map((p) => (
          <div
            key={p._id}
            className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={`https://funny-marketing-app.onrender.com/uploads/${p.image}`}
                alt=""
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-bold">{p.name}</p>
                <p>₹ {p.price}</p>
              </div>
            </div>

            <button
              onClick={() => deleteProduct(p._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
