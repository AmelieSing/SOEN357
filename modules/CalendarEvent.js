const mongoose = require('mongoose');
const moment = require('moment');
//make sure to install moment.js in order to get the correct date format as such: npm install moment

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
    type: String,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  attendees: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      status: {
        type: String,
        enum: ['going', 'not_going', 'interested'],
        default: 'interested',
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sharedWith: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
});


module.exports = CalendarEvent = mongoose.model('event', EventSchema);