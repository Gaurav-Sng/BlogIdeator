const express = require('express');
const {fetchTrends}=require('../src/controllers/trend.controller');
const router = express.Router();

// GET /api/trends?woeid=1
router.get('/', fetchTrends);

module.exports = router;