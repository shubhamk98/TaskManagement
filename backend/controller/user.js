import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { config } from "dotenv";
config();

export const handleSignUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup failed", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Login failed. User not found." });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { username: user.username, userid: user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "12h",
        }
      );

      res.cookie("jwtToken", token, { secure:true, httpOnly: true });
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Login failed. Incorrect password." });
    }
  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const handleLogOut = (req, res) => {
  res.cookie("jwtToken", "", {
    expires: new Date(0),
  });
  res.send();
}