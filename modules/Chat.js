// models/Chat.js
const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Reference to the User model
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event', // Reference to the Event model
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Chat =mongoose.model('chat', ChatSchema);