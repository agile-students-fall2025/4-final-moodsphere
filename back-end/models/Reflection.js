const mongoose = require("mongoose");

const ReflectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  prompt: { type: String, default: "Daily Reflection" },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reflection", ReflectionSchema);