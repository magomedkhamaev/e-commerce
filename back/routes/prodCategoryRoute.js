import {Router} from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
} from "../controller/prodCategoryCtrl.js";
import { authMiddleware, isAdmin } from "../utils/authMiddleware.js";
const router = new Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", getCategory);
router.get("/", getallCategory);

export default router
