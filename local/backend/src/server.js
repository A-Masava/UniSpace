// server.js
require('dotenv').config();

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const authRoutes = require('./routes/auth');

const app = express();

// ── Middleware ──
app.use(cors());           // allow frontend requests
app.use(express.json());   // parse JSON bodies

// ── Database ──
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('DB Error:', err));

// ── Routes ──
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Unispace server is running');
});

// ── Start ──
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});