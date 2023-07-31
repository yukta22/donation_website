import express from "express";
import { getOtp } from "../controllers/otpContoller.js";

export const otpRoute = express.Router();

otpRoute.post("/getOtp", getOtp);
