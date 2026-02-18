export default function ProductCard({ product, onOrder }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300 overflow-hidden w-72">

      {/* Product Image */}
      <img
        src={`https://funny-marketing-app.onrender.com/uploads/${product.image}`}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">

        {/* Name + Rating */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <span className="bg-green-600 text-white text-sm px-2 py-1 rounded">
            4.2 ★
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-1">
          {product.description}
        </p>

        {/* Price + Order Button */}
        <div className="flex justify-between items-center mt-3">
          <p className="font-bold text-lg">₹ {product.price}</p>

          <button
            onClick={() => onOrder(product)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-sm"
          >
            Order
          </button>
        </div>

      </div>
    </div>
  );
}
