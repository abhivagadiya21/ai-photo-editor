const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

const removeBgRoute = require('./removebg');
const authRoute = require('./auth');
const loginRoute = require('./login');
const userRoute = require('./user');
const libraryRoute = require('./library');
// const upscaleRoute = require('./upscale');

app.use('/api', removeBgRoute);  
app.use('/api', authRoute);       
app.use('/api', loginRoute); 
app.use('/api', userRoute); 
app.use('/api', libraryRoute); 
// app.use('/api', upscaleRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
