import express from "express";

const router = express.Router();

import wishListController from "../controllers/wishListController.js";

router
    .route("/")
    .get(wishListController.getWishList)
    .post(wishListController.postWishList);
router
    .route("/:id")
    .get(wishListController.getWishListById)
    .put(wishListController.putWishList)
    .delete(wishListController.deleteWishList);
export default router;