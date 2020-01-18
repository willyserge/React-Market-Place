import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../models/User";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    
    if (!user) {
      return response.status(404).send("No user exsits with that email");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      response.status(200).json(token);
    } else {
      response.status(401).send("Passwords do not match");
    }
  } catch (error) {
    console.error(error);
    response.status(500).send("Error logging in user");
  }
};
