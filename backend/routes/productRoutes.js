const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/", auth, upload.single("image"), async (req, res) => {
  const product = await Product.create({
    ...req.body,
    image: req.file.filename
  });
  res.json(product);
});

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.put("/:id", auth, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
