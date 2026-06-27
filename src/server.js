const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 1024 * 1024 * 500 // 500MB limit
  }
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.post('/api/upload', upload.single('app'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }
  
  res.json({
    success: true,
    file: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size
  });
});

app.get('/api/apps', (req, res) => {
  // TODO: List uploaded apps
  res.json({ apps: [] });
});

// Start server
app.listen(PORT, () => {
  console.log(`Sideload server running on http://localhost:${PORT}`);
});
