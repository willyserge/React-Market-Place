import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

import User from "../../models/User";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).send("Name must be 3-10 charachters long");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email must be valid");
    } else if (!isLength(password, { min: 3 })) {
      return res.status(422).send("Password must be at least 6 charachters");
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await new User({
      name,
      email,
      password: hash,
    }).save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Sign up user, Please try again later");
  }
};
