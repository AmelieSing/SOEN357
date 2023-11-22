// models/EventAttendance.js
const mongoose = require('mongoose');

const EventAttendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,  // Corrected type
    ref: 'user', // Reference to the User model
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,  // Corrected type
    ref: 'event', // Reference to the Event model
  },
  status: {
    type: String,
    enum: ['going', 'not_going', 'interested'],
    default: 'interested',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = EventAttendance =mongoose.model('eventAttendance', EventAttendanceSchema);