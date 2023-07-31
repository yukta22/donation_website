import { User } from "../model/user.js";
import { Otp } from "../model/otp.js";
import { sendEmailCredeantial, sendMail } from "../services/sendMail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { uploadS3 } from "../utills/multer.js";
// import { deleteExpiredOtp } from "./otpContoller.js";

dotenv.config();

const createUser = async (req, res) => {
  try {
    const findData = await User.findOne({ email: req.body.email });
    if (findData) {
      return res.send({ message: "User is already exist" });
    }
    const {
      firstName,
      middleName,
      lastName,
      flatNumber,
      area,
      state,
      city,
      pincode,
      email,
      password,
      date,
    } = req.body;
    console.log(req.body);
    const file = req.files.image;
    const url = await uploadS3(file.name, file.data);
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      photo: url,
      flatNumber: flatNumber,
      area: area,
      state: state,
      city: city,
      pincode: pincode,
      email: email,
      password: hashPassword,
      date: date,
    });
    const otpGenerate = Math.floor(Math.random() * 10000);
    console.log(otpGenerate);
    const otp = new Otp({
      otp: otpGenerate,
    });
    console.log(otp.otp);
    otp.save();
    sendMail({
      email: user.email,
      otp: otp.otp,
    });
    sendEmailCredeantial({
      id: user._id,
      password: user.password,
    });

    const saveUser = await user.save();
    // setTimeout(deleteExpiredOtp, 1000);
    res.status(200).json({ msg: "User created successfully", saveUser });
  } catch (err) {
    console.log(err);
    res.status(409).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const findData = await User.findOne({ email: req.body.email });
    if (!findData) {
      return res.status(409).send({ message: "User not found" });
    }
    const token = jwt.sign({ findData }, process.env.SECRECT_KEY, {
      expiresIn: "8hr",
    });
    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
    });
    res.status(200).send({ findData, token: token });
  } catch (err) {
    console.log(err);
    res.status(409).send(err.message);
  }
};

const getUser = async (req, res) => {
  try {
    const pageno = req.headers.pageno;

    const skipData = 5;
    const data = await User.find()
      .skip((pageno - 1) * skipData)
      .limit(5);

    res.status(200).send(data);
  } catch (err) {
    res.status(409).send(err.message);
  }
};

const getParticularUsers = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(req.body);
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updateUser);
  } catch (err) {
    res.status(409).send(err.message);
  }
};

export { createUser, login, updateUser, getUser, getParticularUsers };
