import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import bookingRoutes from "./src/routes/booking.routes.js";
import serviceRoutes from "./src/routes/service.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import authTokenRoutes from "./src/routes/auth.tokens.routes.js";
import propertyRoutes from "./src/routes/property.routes.js";
import path from "path";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authTokenRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);

const port = process.env.PORT || 4000;
app.get("/", (req, res) => res.send("Hello from the backend!"));
app.listen(port, () => console.log("Server listening on", port));
