const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const basicAuth = require('../middleware/basicAuth');

// Admin UI
router.get('/', basicAuth, async (req, res) => {
  const results = await Result.find().sort({ createdAt: -1 }).limit(200);
  res.render('admin', { results });
});

// Add result from admin form
router.post('/results', basicAuth, async (req, res) => {
  const { time, code } = req.body;
  if (!time || !code || !/^\d{4}$/.test(code)) {
    req.flash = req.flash || ((t)=>t); // no flash lib here; fallback
    return res.status(400).send('Invalid input. time and 4-digit code required.');
  }
  const r = new Result({ time, code });
  await r.save();
  res.redirect('/admin');
});

// Delete
router.post('/results/:id/delete', basicAuth, async (req, res) => {
  await Result.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

module.exports = router;
