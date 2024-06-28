import Message from "../models/message.mjs";
import User from "../models/users.mjs";
import { NotEmpty, isValidObjectId } from "../utils/checksUtil.mjs";

const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    // Validate senderId, receiverId, and content
    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ error: "Please provide senderId and receiverId" });
    }
    if (!NotEmpty(content)) {
      console.log("Empty message content");
      return res.status(400).json({ error: "Can't send empty message" });
    }
    if (!isValidObjectId(senderId) || !isValidObjectId(receiverId)) {
      return res
        .status(400)
        .json({ error: "Invalid senderId or receiverId format" });
    }

    // Check if senderId and receiverId exist in the database
    const [sender, receiver] = await Promise.all([
      User.findById(senderId),
      User.findById(receiverId),
    ]);

    if (!sender || !receiver) {
      console.log(`Couldn't find user ${senderId} or ${receiverId}`);
      return res.status(404).json({ error: "Couldn't find user" });
    }

    // Save the message
    const newMsg = new Message({ senderId, receiverId, content });
    await newMsg.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const userId = req.params.id;
    const { contactId } = req.body;

    // Validate userId and contactId
    if (!userId || !contactId) {
      return res
        .status(400)
        .json({ error: "Please provide userId and contactId" });
    }
    if (!isValidObjectId(userId) || !isValidObjectId(contactId)) {
      return res
        .status(400)
        .json({ error: "Invalid userId or contactId format" });
    }

    // Check if user and contact exist
    const [user, contact] = await Promise.all([
      User.findById(userId),
      User.findById(contactId),
    ]);

    if (!user) {
      console.log(`User ${userId} not found`);
      return res.status(404).json({ error: "User not found" });
    }
    if (!contact) {
      console.log(`Contact ${contactId} not found`);
      return res.status(404).json({ error: "Contact not found" });
    }

    // Find messages exchanged between user and contact
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: contactId },
        { senderId: contactId, receiverId: userId },
      ],
    }).sort({ createdAt: -1 });

    // Format messages for response
    const formattedMessages = messages.map((message) => ({
      _id: String(message._id),
      senderId: String(message.senderId),
      receiverId: String(message.receiverId),
      content: message.content,
      createdAt: message.createdAt,
    }));

    res.status(200).json(formattedMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { sendMessage, getUserMessages };
