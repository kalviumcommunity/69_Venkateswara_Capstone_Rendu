import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
  image: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  available: { type: Boolean, default: true },
});

export default mongoose.model("Bike", bikeSchema);
