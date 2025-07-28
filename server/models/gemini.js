const { GoogleGenerativeAI } = require('@google/generative-ai');
const NodeCache = require('node-cache');

// Initialize cache and Gemini
const cache = new NodeCache({ stdTTL: 86400 });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Helper functions
function getTrendDirection(timelineData) {
  if (!timelineData?.length) return 'some';
  const first = timelineData[0].value;
  const last = timelineData[timelineData.length - 1].value;
  return last > first ? 'increasing' : last < first ? 'decreasing' : 'stable';
}

function getStyleGuidance(style) {
  const styles = {
    informative: 'Educational tone with facts and statistics',
    casual: 'Conversational tone with simple language',
    professional: 'Formal tone with industry terminology',
    humorous: 'Light-hearted tone with jokes'
  };
  return styles[style] || 'Clear, engaging tone';
}


// Main service functions

async function generateBlogPost(topic, style = 'informative', length = 'medium') {
  const cacheKey = `blog_${topic}_${style}_${length}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const wordCounts = { short: '300-400', medium: '400-500', long: '600-700' };
  
  let prompt = `Write a ${wordCounts[length]} word ${style} blog about "${topic}".\n`;
  prompt += `Style: ${getStyleGuidance(style)}\n`;
  prompt += `Format: Markdown with headings, bullet points, and examples.`;
  try {
    // CORRECTED: Proper payload structure for Gemini API
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }]
    });
    
    const text = result.response.text();
    cache.set(cacheKey, text);
    return text;
  } catch (error) {
    console.error('Generation failed:', error);
    throw new Error(`Failed to generate content: ${error.message}`);
  }
}
async function generateBlogTitles(topic, count = 3) {
  const cacheKey = `titles_${topic}_${count}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const prompt = `Generate ${count} SEO-friendly blog titles about "${topic}" (50-65 chars each).`;
  
  try {
    const result = await model.generateContent(prompt);
    const titles = result.response.text().split('\n').filter(t => t.trim());
    cache.set(cacheKey, titles);
    return titles;
  } catch (error) {
    console.error('Title generation failed:', error);
    throw new Error('Failed to generate titles');
  }
}

module.exports = {
  generateBlogPost,
  generateBlogTitles,
  model
};


