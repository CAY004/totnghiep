const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ocrService = require('../services/ocrService');
const authMiddleware = require('../middleware/authMiddleware');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'receipt-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận file hình ảnh'));
    }
  }
});

// Upload and process receipt
router.post('/process-receipt', authMiddleware, upload.single('receipt'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Không có file được upload' });
    }

    const imagePath = req.file.path;
    const result = await ocrService.processReceipt(imagePath);

    if (result.success) {
      // Auto categorize
      const category = ocrService.categorizeExpense(result.data.description);

      res.json({
        ...result.data,
        suggestedCategory: category,
        imagePath: req.file.path
      });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('OCR API Error:', error);
    res.status(500).json({ error: 'Lỗi xử lý hóa đơn' });
  }
});

// Get OCR results for a transaction
router.get('/receipt/:transactionId', authMiddleware, async (req, res) => {
  try {
    // This would typically fetch from database
    // For now, return placeholder
    res.json({ message: 'OCR data for transaction' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;