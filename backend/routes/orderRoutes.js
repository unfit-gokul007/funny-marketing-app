const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const twilio = require("twilio");

const router = express.Router();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post("/", async (req, res) => {

  console.log("Request Body:", req.body);

  try {
    const { productId, quantity, customerName, phoneNumber } = req.body;

    // Validate fields BEFORE creating order
    if (!customerName || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (phoneNumber.length !== 10) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const order = await Order.create({
      productId,
      quantity,
      customerName,
      phoneNumber
    });

    const formattedCustomerNumber = `whatsapp:+91${phoneNumber.trim()}`;


console.log("Before sending to admin...");

    // Send message to Admin
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: process.env.ADMIN_WHATSAPP_NUMBER,
      body: `
🛒 New Order Received!

Product: ${product.name}
Price: ₹${product.price}
Quantity: ${quantity}

Customer: ${customerName}
Phone: ${phoneNumber}
      `
    });

    console.log("Admin message sent");


    // Send confirmation to Customer
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: formattedCustomerNumber,
      body: `
Hi ${customerName} 👋

Your order for ${product.name} is confirmed 🎉

Quantity: ${quantity}
Total: ₹${product.price * quantity}

Thank you for ordering ❤️
      `
    });

    res.json({ message: "Order placed successfully 🎉", order });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order failed" });
  }
});

module.exports = router;
