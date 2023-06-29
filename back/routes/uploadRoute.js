import {Router} from "express";
import { uploadImages, deleteImages } from "../controller/uploadCtrl.js";
import { isAdmin, authMiddleware } from"../utils/authMiddleware.js";
import { uploadPhoto, productImgResize } from "../middlewares/uploadImage.js";
const router = new Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

export default router
