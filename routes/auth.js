const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const College = require('../models/College');

const JWT_SECRET = process.env.JWT_SECRET;

// Simple login: name + collegeCode. Creates user if not exists.
router.post('/login', async (req, res) => {
  try {
    const { name, collegeCode } = req.body;
    if (!name || !collegeCode) return res.status(400).json({ error: 'name and collegeCode required' });

    const college = await College.findOne({ code: collegeCode });
    if (!college) return res.status(400).json({ error: 'Invalid college code' });

    let user = await User.findOne({ name, college: college._id });
    if (!user) {
      user = await User.create({ name, college: college._id });
    }
    const token = jwt.sign({ userId: user._id, collegeId: college._id }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role, college: college.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
