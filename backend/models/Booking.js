import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  bike: { type: mongoose.Schema.Types.ObjectId, ref: "Bike" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startDate: Date,
  endDate: Date,
  totalAmount: Number,
  paymentStatus: { type: String, default: "pending" },
});

export default mongoose.model("Booking", bookingSchema);
