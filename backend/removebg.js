const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pool = require('./db');
const verifyToken = require('./verifyToken');
const sharp = require('sharp');
require('dotenv').config();

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

router.post('/removebg', verifyToken, upload.single('image'), async (req, res) => {
  const file = req.file;
  const userId = req.user?.id; 

  if (!file) {
    return res.status(400).json({ error: 'Image file is missing' });
  }
  if (!userId) {
    return res.status(400).json({ error: 'User not authenticated or ID missing' });
  }

  const fileName = file.filename;
  const filePath = `/uploads/${fileName}`;
  const imagePath = file.path; 

  console.log('User ID:', userId);
  console.log('Saved file:', fileName);

  try {
    const creditResult = await pool.query('SELECT credit FROM users WHERE id = $1', [userId]);

    if (creditResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentCredit = creditResult.rows[0].credit;
    if (currentCredit < 10) {
      return res.status(403).json({ error: 'Not enough credit' });
    }

    const form = new FormData();
    form.append('output_type', 'cutout');
    form.append('bg_blur', '0');
    form.append('scale', 'fit');
    form.append('format', 'PNG');
    form.append('image', fs.createReadStream(imagePath));

    const response = await axios.post(
      'https://api.picsart.io/tools/1.0/removebg',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'X-Picsart-API-Key': process.env.apikey,
          accept: 'application/json',
        }
      }
    );

    const result = response.data;
    const processedUrl = result.data.url;
    const baseUrl = process.env.BASE_URL || 'http://192.168.1.25:5000';
    const originalUrl = `${baseUrl}/uploads/${fileName}`;

    await pool.query(
      `INSERT INTO transactions 
       (user_id, type, amount, description, orignal_image, progressimg_image) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, 'credit_deduction', -10, 'Background removal', originalUrl, processedUrl]
    );

    await pool.query('UPDATE users SET credit = credit - 10 WHERE id = $1', [userId]);

    res.json({
      message: 'Image processed and 10 credits deducted.',
      original: originalUrl,
      processed: processedUrl
    });

  } catch (error) {
    console.error('--- ERROR DURING /removebg PROCESSING ---');
    console.error(error);
    if (error.response) {
      return res.status(error.response.status || 500).json({
        error: error.response.data?.error || 'site is under maintenance',
      });
    } else if (error.request) {
      return res.status(500).json({ error: 'No response from background removal API' });
    } else {
      return res.status(500).json({ error: 'Unexpected server error' });
    }
  }
});


router.post('/upscale', verifyToken, upload.single('image'), async (req, res) => {
  const file = req.file;
  const userId = req.user?.id;

  if (!file) {
    return res.status(400).json({ error: 'Image file is missing' });
  }
  if (!userId) {
    return res.status(400).json({ error: 'User not authenticated or ID missing' });
  }

  const resizedPath = `uploads/resized-${file.filename}.jpg`;

  try {
    
    await sharp(file.path)
      .resize({ width: 3840, height: 2160, fit: 'inside' }) // maintain aspect ratio, max size
      .jpeg()
      .toFile(resizedPath);

    const creditResult = await pool.query('SELECT credit FROM users WHERE id = $1', [userId]);
    if (creditResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentCredit = creditResult.rows[0].credit;
    if (currentCredit < 15) {
      return res.status(403).json({ error: 'Not enough credit' });
    }

    const form = new FormData();
    form.append('upscale_factor', '2');
    form.append('format', 'JPG');
    form.append('mode', 'sync');
    form.append('image', fs.createReadStream(resizedPath));

    const response = await axios.post(
      'https://api.picsart.io/tools/1.0/upscale/ultra',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'X-Picsart-API-Key': process.env.apikey,
          accept: 'application/json',
        },
      }
    );

    const result = response.data;
    if (!result?.data?.url) {
      return res.status(500).json({ error: 'No processed image URL received' });
    }

    const processedUrl = result.data.url;
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    const originalUrl = `${baseUrl}/uploads/${file.filename}`;

    await pool.query(
      `INSERT INTO transactions 
       (user_id, type, amount, description, orignal_image, progressimg_image) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, 'credit_deduction', -15, 'Image Upscaling', originalUrl, processedUrl]
    );

    await pool.query('UPDATE users SET credit = credit - 15 WHERE id = $1', [userId]);

    res.json({
      message: 'Image upscaled and 15 credits deducted.',
      original: originalUrl,
      processed: processedUrl,
    });

  } catch (error) {
    console.error('--- ERROR DURING /upscale PROCESSING ---');
    if (error.response) {
      console.error('API response error:', error.response.data);
      return res.status(error.response.status || 500).json({
        error: error.response.data?.error || 'site is under maintenance',
      });
    } else if (error.request) {
      console.error('No response from upscale API:', error.request);
      return res.status(500).json({ error: 'No response from upscale API' });
    } else {
      console.error('Unexpected server error:', error.message);
      return res.status(500).json({ error: 'Unexpected server error' });
    }
  } finally {
    fs.unlink(resizedPath, (err) => {
      if (err) console.warn('Failed to delete resized image:', resizedPath);
    });
  }
});




router.post('/generate-image', verifyToken, async (req, res) => {
  const userId = req.user?.id;
  const { width, height, count, prompt } = req.body;

  if (!userId) return res.status(401).json({ error: 'User not authenticated' });
  if (!prompt || prompt.trim() === '') return res.status(400).json({ error: 'Prompt is required' });

  try {
    const creditRes = await pool.query('SELECT credit FROM users WHERE id = $1', [userId]);
    if (creditRes.rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const credit = creditRes.rows[0].credit;
    if (credit < 20) return res.status(403).json({ error: 'Not enough credit' });

    const startResponse = await axios.post(
      'https://genai-api.picsart.io/v1/text2image',
      { width, height, count, prompt },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Picsart-API-Key': process.env.apikey,
        },
      }
    );

    const inferenceId = startResponse.data?.inference_id;
    if (!inferenceId) {
      console.error('No inference_id returned from Picsart');
      return res.status(500).json({ error: 'Inference ID not returned' });
    }

    let attempts = 0;
    let finalResult = null;

    while (attempts < 10) {
      await new Promise(r => setTimeout(r, 5000));

      const pollResponse = await axios.get(
        `https://genai-api.picsart.io/v1/text2image/inferences/${inferenceId}`,
        {
          headers: {
            'X-Picsart-API-Key': process.env.apikey,
          },
        }
      );

      const status = pollResponse.data?.data?.status;
      console.log(`Attempt ${attempts + 1} → Status: ${status}`);

      if (status === 'completed' || status === 'success') {
        finalResult = pollResponse.data;
        break;
      }

      attempts++;
    }

    if (!finalResult || !finalResult.data?.images?.length) {
      console.error('Image generation failed or returned no images.');
      return res.status(500).json({ error: 'Image generation timed out or returned no results.' });
    }

    const imageUrls = finalResult.data.images.map(img => img.url);
    const firstImage = imageUrls[0];

    await pool.query(`
      INSERT INTO transactions (user_id, type, amount, description, progressimg_image, prompt)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [userId, 'credit_deduction', -20, 'Text-to-Image Generation', firstImage, prompt]);

    await pool.query('UPDATE users SET credit = credit - $1 WHERE id = $2', [20, userId]);

    return res.json({ message: 'Image(s) generated and credits deducted', result: { data: imageUrls } });

  } catch (error) {
    console.error('--- ERROR DURING /generate-image ---');
    console.error(error.response?.data || error.message || error);

    const status = error.response?.status || 500;
    const message = error.response?.data?.error || 'Unexpected server error';

    return res.status(status).json({ error: message });
  }
});





module.exports = router;
