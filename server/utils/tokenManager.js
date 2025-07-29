const axios = require('axios');
const Token = require('../models/token.model');

const getAuthHeader = () => {
  const auth = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_SECRET}`).toString('base64');
  return `Basic ${auth}`;
};

// One-time setup: Exchange authorization code for initial tokens
async function initializeTokensFromCode() {
  try {
    console.log('Initializing tokens from authorization code...');
    
    if (!process.env.REDDIT_AUTH_CODE) {
      throw new Error('REDDIT_AUTH_CODE not found in environment variables');
    }

    const response = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: process.env.REDDIT_AUTH_CODE,
        redirect_uri: process.env.REDDIT_REDIRECT_URI,
      }),
      {
        headers: {
          Authorization: getAuthHeader(),
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'TrendBuddyBot/1.0 by Smart_Alps3338'
        }
      }
    );

    if (response.data.error) {
      throw new Error(`Reddit API Error: ${response.data.error}`);
    }
    const expiresAt = new Date(Date.now() + (response.data.expires_in - 60) * 1000); // 1 min buffer
    
    await Token.deleteMany({});
    await Token.create({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresAt
    });

    console.log('Initial tokens stored successfully');
    console.log('Access token expires at:', expiresAt);
    return response.data.access_token;

  } catch (error) {
    console.error('Error initializing tokens:', error.response?.data || error.message);
    throw error;
  }
}

async function refreshAccessToken(refreshToken) {
  try {
    console.log('Refreshing Reddit access token...');
    
    const response = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      {
        headers: {
          Authorization: getAuthHeader(),
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'TrendBuddyBot/1.0 by Smart_Alps3338'
        }
      }
    );

    if (response.data.error) {
      throw new Error(`Reddit API Error: ${response.data.error}`);
    }

    const expiresAt = new Date(Date.now() + (response.data.expires_in - 60) * 1000);
    
    await Token.findOneAndUpdate({}, {
      accessToken: response.data.access_token,
      expiresAt
    });

    console.log('Reddit access token refreshed successfully');
    console.log('New token expires at:', expiresAt);
    return response.data.access_token;

  } catch (error) {
    console.error('Error refreshing Reddit token:', error.response?.data || error.message);
    throw error;
  }
}

async function getValidAccessToken() {
  try {
    let tokenDoc = await Token.findOne({});
    
    if (!tokenDoc) {
      console.log('No token found, initializing from authorization code...');
      return await initializeTokensFromCode();
    }

    if (new Date() > tokenDoc.expiresAt) {
      console.log('Token expired, refreshing...');
      
      if (tokenDoc.refreshToken) {
        return await refreshAccessToken(tokenDoc.refreshToken);
      } else {
        console.log('No refresh token available, initializing from authorization code...');
        return await initializeTokensFromCode();
      }
    }

    console.log('Using existing valid token');
    return tokenDoc.accessToken;

  } catch (error) {
    console.error('Error getting valid access token:', error.message);
    throw error;
  }
}

async function testRedditConnection() {
  try {
    const token = await getValidAccessToken();
    
    const response = await axios.get('https://oauth.reddit.com/api/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'TrendBuddyBot/1.0 by Smart_Alps3338'
      }
    });
    
    console.log('Reddit connection test successful!');
   
    return true;
  } catch (error) {
    console.error('Reddit connection test failed:', error.response?.data || error.message);
    return false;
  }
}

// Utility function to check token status
async function getTokenStatus() {
  try {
    const tokenDoc = await Token.findOne({});
    
    if (!tokenDoc) {
      return { status: 'No token found', needsInitialization: true };
    }
    
    const now = new Date();
    const timeUntilExpiry = tokenDoc.expiresAt - now;
    const minutesUntilExpiry = Math.floor(timeUntilExpiry / (1000 * 60));
    
    return {
      status: timeUntilExpiry > 0 ? 'Valid' : 'Expired',
      expiresAt: tokenDoc.expiresAt,
      minutesUntilExpiry: minutesUntilExpiry,
      hasRefreshToken: !!tokenDoc.refreshToken
    };
  } catch (error) {
    return { status: 'Error', error: error.message };
  }
}

module.exports = { 
  getValidAccessToken,
  initializeTokensFromCode,
  refreshAccessToken,
  testRedditConnection,
  getTokenStatus
};
