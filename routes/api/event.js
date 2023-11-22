// routes/api/events.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Event = require('../../models/Event');
const EventAttendance = require('../../models/EventAttendance');
const nodemailer = require('nodemailer');       //this is for sending emails to a user when they are invited to an event


// @route       POST api/events
// @description Create a new event
// @access      Private
router.post(
  '/',
  [
    auth, // Middleware to authenticate the user
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').not().isEmpty(),
    check('end', 'End date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, start, end, description } = req.body;

      const newEvent = new Event({
        title,
        start,
        end,
        description,
        user: req.user.id, // Assuming you have implemented user authentication
      });

      const event = await newEvent.save();

      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       GET api/events
// @description Get all events for the authenticated user
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id }).sort({ start: 'asc' });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/events/:eventId/interest
// @description Set user's interest status for an event
// @access      Private
router.post('/:eventId/interest', auth, async (req, res) => {
    try {
      const { status } = req.body;
      const validStatuses = ['going', 'not_going', 'interested'];
  
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ msg: 'Invalid status' });
      }
  
      const event = await Event.findById(req.params.eventId);
  
      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }
  
      // Check if the user has already expressed interest in this event
      let attendance = await EventAttendance.findOne({
        user: req.user.id,
        event: event.id,
      });
  
      if (!attendance) {
        // Create a new attendance record
        attendance = new EventAttendance({
          user: req.user.id,
          event: event.id,
        });
      }
  
      attendance.status = status;
      await attendance.save();
  
      res.json(attendance);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // @route       POST api/events/:eventId/share
// @description Share an event via email
// @access      Private
//to run this service you must install nodemailer via this in the terminal: npm install nodemailer
router.post('/:eventId/share', auth, async (req, res) => {
    try {
      const event = await Event.findById(req.params.eventId).populate('user', 'email');
  
      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }
  
      // Construct the email content
      const emailContent = `
        Hi,
  
        ${req.user.name} would like to share an event with you:
  
        Event Title: ${event.title}
        Start Time: ${event.start}
        End Time: ${event.end}
        Description: ${event.description || 'No description available'}
  
        You can find more details on the app.
  
        EngageConcordia
      `;
  
      // Set up nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your_email@gmail.com', // Replace with your Gmail email address
          pass: 'your_password', // Replace with your Gmail password or an app-specific password
        },
      });
  
      // Define the email options
      const mailOptions = {
        from: 'your_email@gmail.com', // Replace with your Gmail email address
        to: event.user.email,
        subject: `Event Sharing: ${event.title}`,
        text: emailContent,
      };
  
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ msg: 'Error sending email' });
        }
        console.log('Email sent: ' + info.response);
        res.json({ msg: 'Event shared successfully' });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
 
  
  module.exports = router;