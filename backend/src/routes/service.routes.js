import express from "express";
import {
  createService,
  listServices,
  getService,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";
import { verifySession } from "../middleware/verifySession.js";

const router = express.Router();
router.get("/", listServices);
router.get("/:id", getService);
router.post("/", verifySession, createService);
router.put("/:id", verifySession, updateService);
router.delete("/:id", verifySession, deleteService);
export default router;
