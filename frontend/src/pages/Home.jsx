import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import OrderModal from "../components/OrderModal";

export default function Home({ setCartItems }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get("https://funny-marketing-app.onrender.com/api/products")
      .then(res => setProducts(res.data));
  }, []);

  const startVoice = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      setSearch(event.results[0][0].transcript);
    };
    recognition.start();
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">

    {/* Title */}
    <h1 className="text-4xl font-bold text-center text-red-500 mb-8">
      🍽️ Welcome to Funny Market
    </h1>

    {/* Search Section */}
    <div className="max-w-3xl mx-auto flex mb-8 shadow-lg">

      <input
        className="flex-1 p-3 rounded-l-lg outline-none border"
        placeholder="Search product..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <button
        onClick={startVoice}
        className="bg-purple-500 text-white px-5 rounded-r-lg hover:bg-purple-600"
      >
        🎤
      </button>

    </div>

    {/* Product Grid */}
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

      {filtered.map(product => (
        <ProductCard
  key={product._id}
  product={product}
  onOrder={(product) => {
    setSelected(product);

    setCartItems(prev => {
      const existing = prev.find(item => item._id === product._id);

      if (existing) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }}
/>


      ))}

    </div>

    {/* Order Modal */}
    {selected && (
      <OrderModal
        product={selected}
        close={() => setSelected(null)}
      />
    )}    </div>
  );
}
