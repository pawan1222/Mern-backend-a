import express from "express";
import { newOrder,showOrders,showAllOrders,updateOrder } from "../controllers/orderController.js";
const Router = express.Router();

Router.post("/", newOrder);
Router.get("/:id", showOrders);
Router.get("/", showAllOrders);       // e.g. /api/orders?status=Pending&page=1&limit=5
Router.put("/:id", updateOrder);      // to update order status



export default Router;