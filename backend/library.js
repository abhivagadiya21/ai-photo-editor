const express = require('express');
const router = express.Router();
const pool = require('./db');
const verifyToken = require('./verifyToken');

router.get('/library', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT id, progressimg_image, orignal_image
       FROM transactions
       WHERE user_id = $1 AND is_deleted = FALSE
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching library:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/delete-image/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await pool.query(
      `UPDATE transactions
       SET is_deleted = TRUE
       WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
