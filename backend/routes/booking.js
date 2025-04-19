const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Bike = require('../models/Bike');
const User = require('../models/User');



// Book a bike
router.post('/book', auth, async (req, res) => {
  const { bikeId, startDate, endDate, amount } = req.body;

  try {
    // Validate input
    if (!bikeId || !startDate || !endDate || !amount) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const bike = await Bike.findById(bikeId);
    if (!bike || !bike.availability) {
      return res.status(400).json({ msg: 'Bike unavailable' });
    }

    const renter = await User.findById(req.user.id);
    if (renter.role !== 'renter') {
      return res.status(403).json({ msg: 'Only renters can book bikes' });
    }
    if (!renter.isVerified) {
      return res.status(400).json({ msg: 'Please verify your license' });
    }

    const booking = new Booking({
      renter: req.user.id,
      bike: bikeId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      amount,
      status: 'Pending' // Explicitly set default status
    });

    await booking.save();
    bike.availability = false;
    await bike.save();

    await sendNotification(
      renter.email,
      'Booking Requested',
      'Your booking is pending approval.'
    );

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});