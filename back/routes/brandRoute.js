import {Router} from "express";
import {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
} from "../controller/brandCtrl.js";
import { authMiddleware, isAdmin } from "../utils/authMiddleware.js";
const router = new Router();

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);
router.get("/:id", getBrand);
router.get("/", getallBrand);

export default router
