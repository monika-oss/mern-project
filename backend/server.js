import express from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"
const app = express();
const PORT = process.env.PORT || 5000
const __dirname = path.resolve();

app.use(express.json()); //allow us to accept the  json data in the req.body

app.use("/api/products", productRoutes);
app.use("/uploads", express.static(path.join(__dirname, "/backend/uploads")));


app.listen(PORT, () => {
  connectDB();
  console.log(`server started at http://localhost:${PORT}`);
});
