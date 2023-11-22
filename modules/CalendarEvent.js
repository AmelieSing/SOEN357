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
    type: String,
  },
  description: {
    type: String,
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
});

// Add a pre-save hook to format the date before saving
EventSchema.pre('save', function (next) {
  // Format the start and end dates to MM/DD/YYYY
  this.start = moment(this.start).format('MM/DD/YYYY');
  this.end = moment(this.end).format('MM/DD/YYYY');
  next();
});

module.exports = CalendarEvent = mongoose.model('event', EventSchema);