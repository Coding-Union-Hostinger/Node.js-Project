const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// POST /api/results - upload a 4-digit result for a time
router.post('/results', async (req, res) => {
  try {
    const { time, code } = req.body;
    if (!time || !code) return res.status(400).json({ error: 'time and code are required' });
    if (!/^\d{4}$/.test(code)) return res.status(400).json({ error: 'code must be 4 digits' });

    const result = new Result({ time, code });
    await result.save();
    return res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

// GET /api/results - optional query ?time=...
router.get('/results', async (req, res) => {
  try {
    const { time } = req.query;
    const q = time ? { time } : {};
    const results = await Result.find(q).sort({ createdAt: -1 }).limit(200);
    return res.json({ results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
