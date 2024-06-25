import User from "../models/users.mjs";

const getUserDetails = async (req, res) => {
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

const addContact = async (req, res) => {
  const userId = req.params.id;
  const contactId = req.body.contactId;

  const contact = await User.findById(contactId);
  if (!contact) return res.status(404).json({ error: "User not found" });

  // Check if the user is trying to add themselves
  if (user.id === contact.id)
    return res.status(400).json({ error: "Invalid request" });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  // Check if the contact is already in the user's contacts
  if (user.contacts.includes(contact.id)) {
    return res.status(400).json({ error: "Contact already in contacts" });
  }
};

export { getUserDetails, getAllUsers, getUserContacts, addContact };