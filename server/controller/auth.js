import users from "../models/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // You can shorten this for better security
    );

    // Send response without password
    res.status(201).json({ result: { ...newUser._doc, password: undefined }, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong..." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Compare the password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response without password
    res.status(200).json({ result: { ...existingUser._doc, password: undefined }, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong..." });
  }
};
