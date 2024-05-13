// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/utils/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcryptjs";
import User from "@/models/User";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    connectDB();
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        message: "Please fill data",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please add a valid email",
      });
    }
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        message: "Email already exits",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be more than 6 character",
      });
    }
    // gen salt
    const salt = await bcrypt.genSalt(10)
    console.log(salt)
    // hash password
    const cryptPassword = await bcrypt.hash(password,salt)
    // craete obj
    const newUser = new User({
        first_name,
        last_name,
        email,
        password: cryptPassword
    })
    // save
    await newUser.save();
    res.json({
        message: "Register Success!!"
    })


  } catch (err) {
    console.log(err);
  }
}
