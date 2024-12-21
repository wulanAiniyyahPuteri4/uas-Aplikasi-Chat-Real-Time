import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Handle forgot-password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    console.log(oldUser)
    if (!oldUser) {
      return res.status(404).json({ status: "User Not Exists!!" });
    }

    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });

    const link = `${process.env.FRONTEND_URL}/reset-password/${oldUser._id}/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Click this link to reset your password: ${link}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        return res.status(500).json({ status: "Error sending email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ status: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error during forgot password: ", error);
    res.status(500).json({ status: "Something Went Wrong" });
  }
};

// Handle reset-password GET
export const resetPasswordGet = async (req, res) => {
    const { id, token } = req.params;
  
    try {
      const oldUser = await User.findOne({ _id: id });
      if (!oldUser) {
        return res.status(404).json({ status: "User Not Exists!!" });
      }
  
      const secret = JWT_SECRET + oldUser.password;
      jwt.verify(token, secret); // Verifikasi token
  
      // Redirect ke laman frontend /forgot-password
      const frontendURL = `${process.env.FRONTEND_URL}/forgot-password/${id}/${token}`;
      res.redirect(frontendURL);
    } catch (error) {
      console.error("Error verifying token: ", error);
      res.status(400).json({ status: "Invalid or Expired Token" });
    }
  };  

// Handle reset-password POST
export const resetPasswordPost = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.status(404).json({ status: "User Not Exists!!" });
    }

    const secret = JWT_SECRET + oldUser.password;
    jwt.verify(token, secret); // Verifikasi token

    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      { _id: id },
      { $set: { password: encryptedPassword } }
    );

    res.status(200).json({ status: "Password Reset Successful" });
  } catch (error) {
    console.error("Error resetting password: ", error);
    res.status(400).json({ status: "Something Went Wrong" });
  }
};
