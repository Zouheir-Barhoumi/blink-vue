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
    const userId = req.params.id;
    const { contactId } = req.body;

    const user = await User.findById(userId);
    const contact = await User.findById(contactId);

    // Check if user and contact exist
    if (!user) {
      console.log(`user ${userId} not found`);
      return res.status(404).json({ error: "User not found" });
    }
    if (!contact) {
      console.log(`contact ${contactId} not found`);
      return res.status(404).json({ error: "Contact not found" });
    }

    const messages = await Message.find({
      $or: [
        { $and: [{ senderId: userId }, { receiverId: contactId }] },
        { $and: [{ senderId: contactId }, { receiverId: userId }] },
      ],
    }).sort({ createdAt: -1 });

    const formattedMessages = messages.map((message) => ({
      _id: String(message._id),
      senderId: String(message.senderId),
      receiverId: String(message.receiverId),
      content: message.content,
      createdAt: message.createdAt,
    }));
    console.log(formattedMessages);
    res.status(200).json(formattedMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { sendMessage, getUserMessages };
