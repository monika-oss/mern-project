import express from "express";
import { getProducts, postProduct,getOneProduct, updateProduct, deleteOneProduct } from "../controllers/product.controller.js";


const router=express.Router();

router.get("/",getProducts);

router.get("/:id",getOneProduct);

router.post("/",postProduct);

router.put("/:id",updateProduct);

router.delete("/:id",deleteOneProduct);


export default router;