const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String },
  createdAt: { type: Date, default: Date.now },
  meta: { type: Object } // for attachments, etc.
});

module.exports = mongoose.model('Message', MessageSchema);
