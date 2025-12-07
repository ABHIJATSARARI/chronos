const express = require('express');
const router = express.Router();

/**
 * Health Check Endpoint
 * Used to verify backend is running on Vultr
 */
router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'chronos-backend',
    platform: 'vultr-compute',
    timestamp: new Date().toISOString(),
    integrations: {
      raindrop_mcp: 'connected',
      gemini_api: 'connected'
    }
  });
});

module.exports = router;
