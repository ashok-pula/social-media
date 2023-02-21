const express = require("express");
const {
  getConversation,
  newConversation,
  findConversation,
} = require("../controller/conversationController");

const router = express.Router();

router.post("/", newConversation);
router.get("/:userId", getConversation);
router.get("/find/:senderId/:receiverId", findConversation);

module.exports = router;
