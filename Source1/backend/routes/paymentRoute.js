import express from "express";
import { createPayment, getPayment } from "../controllers/paymentController.js";

export const paymentRoute = express.Router();

paymentRoute.post("/payment", createPayment);
paymentRoute.get("/getPayment", getPayment);
