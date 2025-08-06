// Import DB pool and auth middleware
const express = require('express');
const router = express.Router();
const pool = require('./db');
const verifyToken = require('./verifyToken');

router.get('/credit', verifyToken, async (req, res) => {
  const userId = req.user?.id;
  console.log("User ID from token:", userId);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await pool.query('SELECT credit, email FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ credit: result.rows[0].credit , email: result.rows[0].email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching credit' });
  }
});

module.exports = router;