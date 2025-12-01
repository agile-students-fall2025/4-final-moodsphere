// models/Reflection.js
// Mongoose Reflection model for MongoDB

const mongoose = require('mongoose');

const reflectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String, // Store as YYYY-MM-DD for easy comparison
      required: true,
      index: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Compound index to ensure one reflection per user per day
reflectionSchema.index({ userId: 1, date: 1 }, { unique: true });

// Index for efficient queries by user and date
reflectionSchema.index({ userId: 1, createdAt: -1 });

const Reflection = mongoose.model('Reflection', reflectionSchema);

module.exports = Reflection;
