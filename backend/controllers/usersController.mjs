import User from "../models/users.mjs";

const getUser = async (req, res) => {
  try {
    const user = await user.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {}
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log(`Error getting users: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserContacts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "contacts",
      "-password",
    );
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.contacts);
  } catch (error) {
    console.log(`Error getting user contacts: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};
