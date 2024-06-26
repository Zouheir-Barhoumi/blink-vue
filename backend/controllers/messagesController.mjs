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
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) {
      console.log(`Couldn't find user ${sender} or ${receiver}`);
      res.status(404).json({
        error: "Couldn't find user",
      });
    }
  } catch (error) {}
};
