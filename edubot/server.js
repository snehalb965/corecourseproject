const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const chatbotRoutes = require('./routes/chatbot');
const dotenv = require('dotenv');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// File Upload 
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + path.extname(file.originalname));
  }
});
const upload = multer({ storage }); // ✅ You were missing this line

// Routes
app.use('/api/chatbot', chatbotRoutes);

app.post('/api/uploads', upload.single('form'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({
    message: 'Form uploaded successfully',
    file: req.file.filename
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
