import express from "express";
import {
  register, 
  getCurrentUser,
  listUsers, 
  getUser,  
  createUser,  
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { verifySession } from "../middleware/verifySession.js";

const router = express.Router();
router.post("/register", register);

router.get("/me", verifySession, getCurrentUser); 
router.get("/", verifySession, listUsers);
router.get("/:id", verifySession, getUser);
router.post("/", verifySession, createUser); 
router.put("/:id", verifySession, updateUser);
router.delete("/:id", verifySession, deleteUser);

export default router;
