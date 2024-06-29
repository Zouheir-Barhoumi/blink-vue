import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.mjs";

const notEmpty = (value) =>
  value !== undefined && value !== null && value.length > 0;

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!notEmpty(username) || !notEmpty(email) || !notEmpty(password)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if username is taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already in use" });
    }

    // Check if email is already registered
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Send new user without password
    const user = {
      username: newUser.username,
      email: newUser.email,
    };
    return res.status(201).json(user);
  } catch (error) {
    console.log(`Error registering user: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Generate jwt token
const generateJWT = (user) => {
  const payload = {
    id: user._id,
  };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!notEmpty(email) || !notEmpty(password)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User with email ${email} does not exist`);
      return res
        .status(400)
        .json({ error: "Incorrect password or user does not exist" });
    }

    // Check if password is
    const correctPwd = await bcrypt.compare(password, user.password);
    if (!correctPwd) {
      return res
        .status(400)
        .json({ error: "Incorrect password or user does not exist" });
    }

    // Send jwt token and user without password
    const token = generateJWT(user);
    const userDetails = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    return res.status(200).json({ token, userDetails });
  } catch (error) {
    console.log(`Error logging in: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { register, login };
