const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String }, // optional
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
  role: { type: String, enum: ['student','admin','faculty'], default: 'student' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
