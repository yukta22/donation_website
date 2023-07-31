import { Payment } from "../model/payment.js";
import { User } from "../model/user.js";

const createPayment = async (req, res) => {
  try {
    console.log(req.body);
    const { id, month, year, amount } = req.body;

    const payment = new Payment({
      month: month,
      year: year,
      amount: amount,
      user: id,
    });

    const savePayment = await payment.save();
    res.status(200).send(savePayment);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

const getPayment = async (req, res) => {
  try {
    const findData = await Payment.find().populate("user");
    res.status(200).json(findData);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

export { createPayment, getPayment };
