import express from "express";
import {
  createProperty,
  listProperties,
  getProperty,
} from "../controllers/property.controller.js";
import { uploadSingle } from "../middleware/upload.js";
import { verifySession } from "../middleware/verifySession.js"; 
const router = express.Router();


router.post(
  "/",
  verifySession,
  (req, res, next) => {
    uploadSingle(req, res, function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  createProperty
);

router.get("/", listProperties);

router.get("/:id", getProperty);

export default router;
