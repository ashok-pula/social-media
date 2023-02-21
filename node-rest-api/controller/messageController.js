const Message = require("../models/Message");

const newMessage = async (req, res) => {
  const newmessage = new Message(req.body);
  try {
    const savedMessage = await newmessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessage = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { newMessage, getMessage };
