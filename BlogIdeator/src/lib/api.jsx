import axios from 'axios';

export const generateBlogOutline = async (topic, userInput = '') => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/blogs/generate',
      {
        topic,
        style: 'informative', // Default style
        length: 'medium',     // Default length
        userInput,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data; // Axios stores the response data in `data` property

  } catch (error) {
    console.error('API Error:', error);

    // Axios wraps the error response in `error.response`
    if (error.response) {
      // Server responded with a status code outside 2xx (e.g., 400, 500)
      console.error('Response data:', error.response.data);
      console.error('Status code:', error.response.status);
      throw new Error(`API Error: ${error.response.data.message || error.message}`);
    } else if (error.request) {
      // Request was made but no response received (e.g., network error)
      throw new Error('No response from server. Check your network connection.');
    } else {
      // Something else went wrong (e.g., bad request config)
      throw new Error('Request setup error: ' + error.message);
    }
  }
};