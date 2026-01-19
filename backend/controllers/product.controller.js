import Product from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching the products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching the product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const postProduct = async (req, res) => {
  const { name, price } = req.body;
  let image = req.body.image;

  if (req.file) {
    image = `/uploads/${req.file.filename}`;
  }

  if (!name || !price || !image) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product({ name, price, image });

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;        // ✅ get id from URL
  const product = req.body;

  // validate MongoDB id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid product id",
    });
  }

  // // field validation
  // if (!product.name || !product.price || !product.image) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Please provide all fields",
  //   });
  // }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

    return res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.log("error in update product:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const deleteOneProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "invalid product id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("error in fetching and delete the products:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};