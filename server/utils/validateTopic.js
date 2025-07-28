//  - Validates topic strings for safety and relevance

/**
 * Validates a topic string for use in API calls and content generation
 * 
 * @param {string} topic - The topic string to validate
 * @returns {boolean} Whether the topic is valid
 */
function validateTopic(topic) {
    if (!topic || typeof topic !== 'string') {
      return false;
    }
    
    // Trim whitespace and check length
    const trimmedTopic = topic.trim();
    if (trimmedTopic.length < 2 || trimmedTopic.length > 100) {
      return false;
    }
    
    // Check for potentially harmful characters (SQL injection, XSS, etc.)
    const dangerousPatterns = [
      /[<>]/, // HTML tags
      /javascript:/i, // JavaScript protocol
      /(union|select|insert|delete|update|drop|alter|exec)/i, // SQL keywords
      /\/etc\/passwd/i, // Common file paths
    ];
    
    for (const pattern of dangerousPatterns) {
      if (pattern.test(trimmedTopic)) {
        return false;
      }
    }
    
    // List of prohibited topics (expand as needed)
    const prohibitedTopics = [
      'terrorism',
      'suicide',
      'child abuse',
      'pornography',
      'illegal drugs',
      'weapons manufacturing',
      'hate speech'
    ];
    
    // Check if topic contains any prohibited terms
    for (const prohibitedTopic of prohibitedTopics) {
      if (trimmedTopic.toLowerCase().includes(prohibitedTopic)) {
        return false;
      }
    }
    
    return true;
  }
  
  module.exports = validateTopic;