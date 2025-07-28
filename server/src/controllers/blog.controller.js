const { generateBlogPost } = require('../../models/gemini');

// Blog generation
async function generateBlog(req, res) {
  try {
    const { topic, style = 'informative', length = 'medium',userInput } = req.body;
    const content = await generateBlogPost(topic, style, length,userInput);
    res.json({
      success: true,
      content,
      metadata: { topic, style, length }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// Title generation
async function generateBlogTitle(req, res) {
  try {
    const { topic, count = 3 } = req.body;
    const titles = await generateBlogPost(topic, null, 'title-only', count);
    
    res.json({
      success: true,
      titles: Array.isArray(titles) ? titles : [titles]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = {
  generateBlog,
  generateBlogTitle
};