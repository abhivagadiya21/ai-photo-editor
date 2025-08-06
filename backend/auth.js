const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('./db');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const result = await pool.query(
      'INSERT INTO users (email, password, credit) VALUES ($1, $2, $3) RETURNING *',
      [email, hashedPassword, 100] 
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        email: result.rows[0].email,
        credit: result.rows[0].credit
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
