import bcrypt from "bcrypt";
import User from "../models/users.mjs";

const rgister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Email already in use" });
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
    return res.status(201).send(user);
  } catch (error) {
    console.log(`Error registering user: ${error}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};
