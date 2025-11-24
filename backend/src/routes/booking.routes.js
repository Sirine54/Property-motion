import express from "express";
import {
  createBooking,
  listBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  bookingStats,
} from "../controllers/booking.controller.js";
import { verifySession } from "../middleware/verifySession.js";

const router = express.Router();

router.get("/stats", bookingStats);  
router.get("/", listBookings); 
router.post("/", verifySession, createBooking);
router.put("/:id", verifySession, updateBooking);
router.delete("/:id", verifySession, deleteBooking);

export default router;
