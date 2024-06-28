import Message from "../models/message.mjs";
import User from "../models/users.mjs";
import NotEmpty from "../utils/checksUtil.mjs";

const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    // check if senderId and receiverId are valid
    if (!senderId || !receiverId) {
      return res.status(400).json({
        error: "Please provide senderId and receiverId",
      });
    }

    // check if content is valid
    if (!NotEmpty(content)) {
      console.log("Empty message content");
      return res.status(400).json({
        error: "Can't send empty message",
      });
    }

    // check if senderId and receiverId exist in the database
    const [sender, receiver] = await Promise.all([
      User.findById(senderId),
      User.findById(receiverId),
    ]);

    if (!sender || !receiver) {
      console.log(`Couldn't find user ${sender} or ${receiver}`);
      return res.status(404).json({
        error: "Couldn't find user",
      });
    }

    // Save the message
    const newMsg = new Message({
      senderId,
      receiverId,
      content,
    });
    await newMsg.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const { contactId } = req.body;

    const user = await User.findById(userId);
    const contact = await User.findById(contactId);
    // check if senderId and receiverId are valid
    if (!senderId || !receiverId) {
      return res.status(400).json({
        error: "Please provide senderId and receiverId",
      });
    }
    const messages = await Message.find({
      $or: [
        { $and: [{ senderId: user }, { receiverId: contact }] },
        { $and: [{ senderId: contact }, { receiverId: user }] },
      ],
    }).sort({ createdAt: -1 });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { sendMessage, getUserMessages };
