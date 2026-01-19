import express from "express";
import { getProducts, postProduct, getOneProduct, updateProduct, deleteOneProduct } from "../controllers/product.controller.js";
import upload from "../config/multer.js";


const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getOneProduct);

router.post("/", upload.single("image"), postProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteOneProduct);


export default router;