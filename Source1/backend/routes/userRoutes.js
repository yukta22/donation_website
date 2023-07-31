import express from "express";
import {
  createUser,
  login,
  updateUser,
  getUser,
  getParticularUsers,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const userRoute = express.Router();

userRoute.get("/getUser", getUser);
// userRoute.use(verifyToken);
userRoute.post("/login", login);
// userRoute.post("/user", upload.fields([{ name: "image" }]), createUser);
userRoute.post("/user", createUser);

userRoute.put("/updateUser/:id", updateUser);
userRoute.get("/user/:id", getParticularUsers);
