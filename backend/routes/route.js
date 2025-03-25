import express from 'express';
import authRoutes from "../controllers/authController.js";
import bikeRoutes from "../controllers/bikeController.js";
import bookingRoutes from "../controllers/bookingController.js";
import adminRoutes from "../controllers/adminController.js";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/bikes", bikeRoutes);

router.use("/bookings", bookingRoutes);

router.use("/admin", adminRoutes);

export default router;