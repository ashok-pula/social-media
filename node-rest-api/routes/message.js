const express = require("express");
const { newMessage, getMessage } = require("../controller/messageController");

const router = express.Router();

router.post("/", newMessage);
router.get("/:conversationId", getMessage);

module.exports = router;
