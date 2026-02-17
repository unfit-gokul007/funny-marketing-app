const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  quantity: Number,
  customerName: String,
  phoneNumber: String
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
