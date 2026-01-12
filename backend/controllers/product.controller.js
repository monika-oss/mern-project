import Product from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts=async(req,res)=>{
     try {
    const products = await Product.find({});
    return res.status(201).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching the products:", error.message);
    res.status(400).json({ success: false, message: "server error" });
  }
}

export const getOneProduct=async(req,res)=>{
   try {
    const { id } = req.params;
    const products = await Product.findById(id);
    return res.status(201).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching the products:", error.message);
    res.status(400).json({ success: false, message: "server error" });
  }
}

export const postProduct=async(req,res)=>{
   const product = req.body; //user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ sucess: false, message: "Please proovide all fields" });
  }
  const newProduct = await Product(product);

  try {
    await newProduct.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("error in create product:", error.message);
    res.status(400).json({ success: false, message: "server error" });
  }
}

export const updateProduct=async(req,res)=>{
   const product = req.body; //user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ sucess: false, message: "Please provide all fields" });
  }
  const newProduct = await Product(product);

  try {
    await newProduct.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("error in create product:", error.message);
    res.status(400).json({ success: false, message: "server error" });
  }
}

export const deleteOneProduct=async(req,res)=>{
   const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("error in fetching and delete the products:", error.message);
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
}