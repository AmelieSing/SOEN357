// models/Event.js
const mongoose = require('mongoose');
const moment = require('moment');
const EventSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // Assuming you want to store time as a string (e.g., "12:00 PM")
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // Reference to the User model
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'eventAttendance', // Reference to the EventAttendance model
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  // Add a pre-save hook to format the date before saving
  EventSchema.pre('save', function (next) {
    // Format the start and end dates to MM/DD/YYYY
    this.start = moment(this.start).format('MM/DD/YYYY');
    this.end = moment(this.end).format('MM/DD/YYYY');
    next();
  });
  
  module.exports = mongoose.model('event', EventSchema);