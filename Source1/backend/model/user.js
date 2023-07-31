import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    //required: true,
  },
  middleName: {
    type: String,
    //required: true,
  },
  lastName: {
    type: String,
    //required: true,
  },
  photo: {
    type: String,
    // required: true,
  },
  flatNumber: {
    type: Number,
    //required: true,
  },
  area: {
    type: String,
    //required: true,
  },
  state: {
    type: String,
    //required: true,
  },
  city: {
    type: String,
    //required: true,
  },
  pincode: {
    type: Number,
    //required: true,
  },
  email: {
    type: String,
    //required: true,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },

  role: {
    type: String,
    enum: ["Admin", "Devotees"],
    default: "Devotees",
  },
});

export const User = mongoose.model("user", userSchema);
