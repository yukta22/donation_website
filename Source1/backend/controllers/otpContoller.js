import { Otp } from "../model/otp.js";

const getOtp = async (req, res) => {
  try {
    const findOtp = await Otp.findOne({ otp: req.body.inputOtp });
    if (findOtp) {
      res.status(201).send("Otp found");
    } else {
      res.send("Otp not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// export { getOtp, deleteExpiredOtp };
export { getOtp };
