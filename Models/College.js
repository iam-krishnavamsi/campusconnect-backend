const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true }, // e.g., NITW2025
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('College', CollegeSchema);
