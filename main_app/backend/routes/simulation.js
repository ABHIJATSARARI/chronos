const express = require('express');
const router = express.Router();
const { generateSimulation } = require('../services/gemini');
const { saveTimelineToRaindrop } = require('../services/raindrop');

/**
 * POST /api/simulation/generate
 * Generate multiverse timelines using Gemini API
 */
router.post('/generate', async (req, res) => {
  try {
    const { age, occupation, regret, decision } = req.body;

    // Validate input
    if (!age || !occupation || !decision) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['age', 'occupation', 'decision']
      });
    }

    const userInput = {
      age: parseInt(age),
      occupation,
      regret: regret || '',
      decision
    };

    console.log('🔮 Generating simulation for:', userInput);

    // Generate timelines via Gemini
    const simulationData = await generateSimulation(userInput);

    res.json({
      success: true,
      data: simulationData
    });

  } catch (error) {
    console.error('Simulation generation error:', error);
    res.status(500).json({
      error: 'Divergence Engine Failed',
      message: error.message
    });
  }
});

/**
 * POST /api/simulation/save
 * Save timeline to Raindrop MCP SmartMemory
 */
router.post('/save', async (req, res) => {
  try {
    const { userId, simulationData } = req.body;

    if (!userId || !simulationData) {
      return res.status(400).json({
        error: 'Missing userId or simulationData'
      });
    }

    console.log('🌊 Saving timeline to Raindrop MCP...');

    // Store in Raindrop SmartMemory
    const session = await saveTimelineToRaindrop(userId, simulationData);

    res.json({
      success: true,
      session
    });

  } catch (error) {
    console.error('Raindrop save error:', error);
    res.status(500).json({
      error: 'Memory Sync Failed',
      message: error.message
    });
  }
});

module.exports = router;
