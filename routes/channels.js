const express = require('express');
const router = express.Router();
const Channel = require('../models/Channel');
const Message = require('../models/Message');
const User = require('../models/User');

// create channel (admin)
router.post('/', async (req, res) => {
  const { collegeId, name, createdBy, isAnnouncement } = req.body;
  if (!collegeId || !name) return res.status(400).json({ error: 'collegeId and name required' });
  const channel = await Channel.create({ college: collegeId, name, createdBy, isAnnouncement });
  res.json(channel);
});

// get recent messages for a channel
router.get('/:channelId/messages', async (req, res) => {
  const messages = await Message.find({ channel: req.params.channelId }).sort({ createdAt: 1 }).populate('sender','name');
  res.json(messages);
});

module.exports = router;
