const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const authMiddleware = require('../middleware/authMiddleware');

// Chat with AI
router.post('/chat', authMiddleware, async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await aiService.analyzeSpending(userId || req.user.id, message);

    res.json({ response });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get financial insights
router.get('/insights/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const insights = await aiService.generateFinancialAdvice(userId);

    res.json({ insights });
  } catch (error) {
    console.error('Insights API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;