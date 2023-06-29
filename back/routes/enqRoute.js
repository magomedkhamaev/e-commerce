import { Router } from 'express';
import {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
} from "../controller/enqCtrl.js";
import { authMiddleware, isAdmin } from "../utils/authMiddleware.js";
const router = new Router();

router.post("/", createEnquiry);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);
router.get("/:id", getEnquiry);
router.get("/", getallEnquiry);

export default router;