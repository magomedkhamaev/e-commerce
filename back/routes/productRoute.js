import {Router} from "express";
import {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
  AllRating
} from "../controller/productCtrl.js";
import { productImgResize, uploadPhoto } from "../middlewares/uploadImage.js";
import { isAdmin, authMiddleware } from "../utils/authMiddleware.js";
const router = new Router();

router.post("/", authMiddleware, isAdmin, createProduct);

router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 10),productImgResize, uploadImages);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/all-ratings/:id", AllRating);
router.get("/", getAllProduct);

export default router