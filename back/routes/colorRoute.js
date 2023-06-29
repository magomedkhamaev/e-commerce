import { Router } from 'express';

import {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getallColor,
} from "../controller/colorCtrl.js";
import { authMiddleware, isAdmin } from "../utils/authMiddleware.js";
const router = new Router();

router.post("/", authMiddleware, isAdmin, createColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);
router.get("/:id", getColor);
router.get("/", getallColor);


export default router;