import express from "express";

const router = express.Router();

import ordersController from "../controllers/ordersController.js";

router
    .route("/")
    .get(ordersController.getOrders)
    .post(ordersController.postOrders);
router
    .route("/public")
    .get(ordersController.getPublicOrders)
    .post(ordersController.postPublicOrders)
router
    .route("/public/:id")
    .put(ordersController.putPublicOrders)
router
    .route("/:id")
    .get(ordersController.getOrder)
    .put(ordersController.putOrders)
    .delete(ordersController.deleteOrders);
export default router;