import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRECT_KEY, (err, data) => {
    if (err) {
      res.status(401).send(err);
    } else {
      if (data.findData.role == "Admin") {
        next();
      } else {
        res.status(401).send("You are unauthorized user");
      }
    }
  });
};
