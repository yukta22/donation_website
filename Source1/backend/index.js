import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRoute } from "./routes/userRoutes.js";
import { paymentRoute } from "./routes/paymentRoute.js";
import { otpRoute } from "./routes/otpRoute.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
const app = express();

mongoose
  .connect("mongodb://localhost:27017/ReactNodeFullStack")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use("/", userRoute);
app.use("/", paymentRoute);
app.use("/", otpRoute);

app.listen(9000, () => {
  console.log("listening on 9000");
});
