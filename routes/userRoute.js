const express = require('express');
const User = require('../models/User');
const Address = require('../models/Address');
const router = express.Router();

// Route to create a new user with addresses
router.post('/register', async (req, res) => {
  try {
    const { name, addresses } = req.body;

    // Create the user
    const newUser = new User({ name });

    // Create addresses and link them to the user
    const addressDocs = await Address.insertMany(
      addresses.map((address) => ({ ...address, user: newUser._id }))
    );

    // Link addresses to the user
    newUser.addresses = addressDocs.map((address) => address._id);
    await newUser.save();

    res.status(201).json({
      message: 'User and addresses created successfully',
      user: newUser,
      addresses: addressDocs,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user or addresses', error });
  }
});

router.post('/add', async (req, res) => {
    try {
      const { name, addresses } = req.body;
  
      const newUser = new User({ name });
  
  
      if (addresses && addresses.length > 0) {
        const addressDocs = await Address.insertMany(
          addresses.map((address) => ({ ...address, user: newUser._id }))
        );
        newUser.addresses = addressDocs.map((address) => address._id);
      }
  
      await newUser.save();
  
      res.status(201).json({
        message: 'New user created successfully',
        user: newUser,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error adding new user', error });
    }
  });
  
  module.exports = router;
