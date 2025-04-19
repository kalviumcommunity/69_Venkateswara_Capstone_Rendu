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


router.put('/update/:id', auth, async (req, res) => {
    const { status } = req.body;
  
    try {
      const validStatuses = ['Pending', 'Approved', 'Completed', 'Cancelled'];
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ msg: 'Invalid status' });
      }
  
      const booking = await Booking.findById(req.params.id)
        .populate('bike')
        .populate('renter');
  
      if (!booking) {
        return res.status(404).json({ msg: 'Booking not found' });
      }
  
      if (booking.bike.owner.toString() !== req.user.id) {
        return res.status(403).json({ msg: 'Not authorized' });
      }
  
      booking.status = status;
  
      if (status === 'Completed') {
        booking.bike.availability = true;
        const provider = await User.findById(booking.bike.owner);
        provider.earnings = (provider.earnings || 0) + booking.amount;
        await provider.save();
        await booking.bike.save();
      } else if (status === 'Cancelled') {
        booking.bike.availability = true;
        await booking.bike.save();
      }
  
      await booking.save();
  
      await sendNotification(
        booking.renter.email,
        'Booking Update',
        `Your booking is now ${status}.`
      );
  
      res.json(booking);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  });
  