const express = require('express');
const router = express.Router();
const College = require('../models/College');
const Channel = require('../models/Channel');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
  const colleges = await College.find().select('-__v');
  res.json(colleges);
});

// Get channels for a college
router.get('/:collegeId/channels', async (req, res) => {
  const channels = await Channel.find({ college: req.params.collegeId }).sort('createdAt');
  res.json(channels);
});

module.exports = router;
