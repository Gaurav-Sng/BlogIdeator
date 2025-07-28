const express = require('express');
const { body } = require('express-validator');
const blogController=require('../src/controllers/blog.controller')
const router = express.Router();

router.post('/generate', [
  body('topic').isString().trim().notEmpty(),
  body('style').optional().isIn(['informative', 'casual', 'professional', 'humorous']),
  body('length').optional().isIn(['short', 'medium', 'long']),
  body('userInput').optional().isString().trim().notEmpty()
], blogController.generateBlog); 

router.post('/titles', [
  body('topic').isString().trim().notEmpty(),
  body('count').optional().isInt({ min: 1, max: 10 })
], blogController.generateBlogTitle); 

module.exports = router;