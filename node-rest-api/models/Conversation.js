const mongoose = require("mongoose");

const converstaionSchema = new mongoose.Schema(
  {
    members: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", converstaionSchema);

module.exports = Conversation;
