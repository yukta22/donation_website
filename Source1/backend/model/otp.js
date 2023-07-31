import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Otp = mongoose.model("Otp", otpSchema);
