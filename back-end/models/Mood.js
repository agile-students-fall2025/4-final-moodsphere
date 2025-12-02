// models/Mood.js
// Mongoose Mood model for MongoDB

const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    mood: {
      type: String,
      required: true,
      trim: true,
    },
    loggedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Index for efficient queries by user and date
moodSchema.index({ userId: 1, loggedAt: -1 });

const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;
