// models/JournalEntry.js
// Mongoose JournalEntry model for MongoDB

const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: 'Untitled',
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Index for efficient queries by user and date
journalEntrySchema.index({ userId: 1, createdAt: -1 });

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

module.exports = JournalEntry;
