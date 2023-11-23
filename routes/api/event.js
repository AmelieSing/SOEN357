// routes/api/events.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Event = require('../../modules/CalendarEvent');
const EventAttendance = require('../../modules/EventAttendance');
const nodemailer = require('nodemailer');       //this is for sending emails to a user when they are invited to an event
const User = require('../../modules/User');

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

      // Create a new event
      const newEvent = new Event({
          title,
          start,
          end,
          description,
          user: req.user.id,
      });

      const event = await newEvent.save();

      // Update UserCreatedEvents in the user's profile
      await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $push: { UserCreatedEvents: event.id } },
          { new: true }
      );

      res.json(event);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

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

        const eventId = req.params.eventId;
        const userId = req.user.id;

        // Check if the user has already expressed interest in this event
        let attendance = await EventAttendance.findOne({
            user: userId,
            event: eventId,
        });

        if (!attendance) {
            // Create a new attendance record
            attendance = new EventAttendance({
                user: userId,
                event: eventId,
            });
        }

        attendance.status = status;
        await attendance.save();

        // Update the attendees array in the Event model
        await Event.findByIdAndUpdate(
            eventId,
            {
                $addToSet: { // Add the user to the attendees array if not already present
                    attendees: { user: userId, status: status },
                },
            },
            { new: true } // Return the updated document
        )
        .populate('attendees.user', 'name') // Populate the attendees array with user details
        .exec(function (err, updatedEvent) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Server Error');
            }

            res.json(updatedEvent);
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
  
// @route       POST api/events/:eventId/share
// @description Share an event within the app with specific users by name
// @access      Private
router.post('/:eventId/share', auth, async (req, res) => {
  try {
      const event = await Event.findById(req.params.eventId).populate('user', 'email');

      if (!event) {
          return res.status(404).json({ msg: 'Event not found' });
      }

      // Check if the event is already shared with the user
      const alreadyShared = event.sharedWith.some(userId => userId.toString() === req.user.id);
      if (alreadyShared) {
          return res.status(400).json({ msg: 'Event already shared with this user' });
      }

      // Get the array of user names to share the event with
      const { shareWithUserNames } = req.body;

      // Assuming you have a sharedWith array in your Event model
      if (!event.sharedWith) {
          event.sharedWith = [];
      }

      // Iterate through the array of user names and find their corresponding user IDs
      const userIdsToShareWith = [];
      for (const userName of shareWithUserNames) {
          const user = await User.findOne({ name: userName });
          if (user) {
              userIdsToShareWith.push(user.id);

              // Update SharedEvents in the user's profile
              await Profile.findOneAndUpdate(
                  { user: user.id },
                  { $push: { SharedEvents: event.id } },
                  { new: true }
              );
          }
      }

      // Add the user IDs to the sharedWith array
      event.sharedWith = [...event.sharedWith, ...userIdsToShareWith];

      // Save the updated event
      await event.save();

      res.json({ msg: 'Event shared successfully within the app' });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});
  module.exports = router;