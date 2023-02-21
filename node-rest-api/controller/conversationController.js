const Conversation = require("../models/Conversation");

const newConversation = async (req, res) => {
  const conversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    // console.log(req.body);

    const newconv = await conversation.save();
    res.status(200).json(newconv);
  } catch (error) {
    // console.log("Ashok");
    res.status(500).json(error);
  }
};

const getConversation = async (req, res) => {
  try {
    const converstaion = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(converstaion);
  } catch (error) {
    res.status(500).json(error);
  }
};
const findConversation = async (req, res) => {
  console.log("Ashok");
  // /find/:senderId/:receiverId
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.senderId, req.params.receiverId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { newConversation, getConversation, findConversation };
