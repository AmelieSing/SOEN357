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
    type: Date,
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
// Add a pre-save hook to format the date before saving
EventSchema.pre('save', function (next) {
  // Format the start and end dates to MM/DD/YYYY
  this.start = moment(this.start).format('MM/DD/YYYY');
  this.end = moment(this.end).format('MM/DD/YYYY');
  next();
});

module.exports = CalendarEvent = mongoose.model('event', EventSchema);