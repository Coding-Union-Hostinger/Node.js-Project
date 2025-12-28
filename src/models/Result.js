const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  time: { type: String, required: true }, // e.g., '12:00' or ISO
  code: { type: String, required: true }, // 4-digit string
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);
