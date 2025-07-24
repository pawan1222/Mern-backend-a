import express from "express";
import upload from "../utils/upload.js";
import { addProduct,showProducts,deleteProduct,updateProduct,getProduct,displayProducts } from "../controllers/productController.js";

const Router = express.Router();


//user 
Router.get("/all", displayProducts);

//admin
Router.get("/", showProducts);
// Router.post("/", addProduct);
Router.post("/", upload.single("image"), addProduct);

Router.get("/:id", getProduct);
Router.patch("/:id", updateProduct);
Router.delete("/:id", deleteProduct);

export default Router;