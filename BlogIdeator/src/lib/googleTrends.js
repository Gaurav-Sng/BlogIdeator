const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class GoogleTrendsAPI {
  static async getDailyTrends() {
    try {
      const response = await fetch(`${API_URL}/api/trends/daily`);
      if (!response.ok) {
        throw new Error('Failed to fetch daily trends');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching daily trends:', error);
      throw error;
    }
  }

  static async searchTopics(query) {
    try {
      const response = await fetch(`${API_URL}/api/trends/related?keyword=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search topics');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching topics:', error);
      throw error;
    }
  }
}

export { GoogleTrendsAPI }; 