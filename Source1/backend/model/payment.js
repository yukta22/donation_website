import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  month: Number,
  year: Number,
  amount: Number,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

export const Payment = mongoose.model("Payment", paymentSchema);
