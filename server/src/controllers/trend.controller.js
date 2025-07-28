const axios = require('axios');
const { getValidAccessToken } = require('../../utils/tokenManager');
const { model } = require('../../models/gemini');

const cache = new Map();
const generateBlogTopicsFromPost = async (data) => {
  const generatedTopics = [];

  // Ensure model is provided
  if (!model) {
    throw new Error("Gemini model object is not provided to generateBlogTopicsFromPost.");
  }

  // Use a for...of loop to correctly handle async/await operations sequentially.
  // If parallel processing is desired, consider Promise.all with Array.prototype.map.
  for (const [title, comments] of Object.entries(data)) {
    const prompt = `Create most compelling and seo optimized blog title around the topic "${title}". Use these Reddit comments for reactions and inspiration: "${comments}".
                      Provide one 5-8 words short distinct, catchy title. Say title only, directly return title.`;
    const cacheKey = `blog_topic_${title.replace(/\s+/g, '_').toLowerCase()}`; // Generate a unique cache key

    // Check cache first

    if (cache.has(cacheKey)) {
      console.log(`Cache hit for "${title}"`);
      generatedTopics.push({
        originalTitle: title,
        comments: comments,
        generatedTopic: cache.get(cacheKey),
        source: 'cache'
      });
      continue; // Move to the next iteration
    }

    try {
      // CORRECTED: Direct call to model.generateContent
      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [{ text: prompt }]
        }]
      });
      // Extract text from the result object returned by the client library
      const text = result.response.text();

      cache.set(cacheKey, text); // Store in cache
      generatedTopics.push({
        originalTitle: title,
        comments: comments,
        generatedTopic: text,
        source: 'gemini'
      });

    } catch (error) {
      console.error(`Generation failed for title: "${title}":`, error);
      generatedTopics.push({
        originalTitle: title,
        comments: comments,
        generatedTopic: null,
        error: `Failed to generate content: ${error.message}`,
        source: 'gemini'
      });
    }
  }

  return generatedTopics; // Return the collected results
};


// New endpoint for getting blog topics from multiple subreddit
const fetchTrends = async (req, res) => {
  try {
    const { generateTopics = true, subreddit = 'popular', timeframe = 'day' } = req.query;
    const accessToken = await getValidAccessToken();
   // console.log("\nsubreddit", subreddit);

    const redditResponse = await axios.get(`https://oauth.reddit.com/r/${subreddit}/hot`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'TrendBuddyBot/1.0 by Smart_Alps3338'
      },
      params: {
        limit: 15,
        t: timeframe || 'day'
      }
    });

    let trends = redditResponse.data.data.children.map(post => ({
      id: post.data.id,
      title: post.data.title,
      subreddit: post.data.subreddit_name_prefixed,
      score: post.data.score,
      comments: post.data.num_comments,
      created: new Date(post.data.created_utc * 1000),
    }));

    // Filter out low-engagement posts
    trends = trends.filter(trend => trend.score > 300 && trend.comments > 50);

    // Generate blog topics if requested
    if (generateTopics) {
      console.log('Starting blog topic generation...');

      // Prepare data with actual comments
      const dataForGeneration = {};

      // Fetch comments for each trend (limit to top 3 to avoid too many API calls)
      const topTrends = trends.slice(0, 3);

      for (const trend of topTrends) {
        try {
          // Fetch comments for this specific post
          const commentsResponse = await axios.get(`https://oauth.reddit.com/comments/${trend.id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'User-Agent': 'TrendBuddyBot/1.0 by Smart_Alps3338'
            },
            params: {
              limit: 5,
              sort: 'top'
            }
          });

          // Extract comment text
          const comments = commentsResponse.data[1]?.data?.children
            ?.filter(comment => comment.data.body &&
              comment.data.body !== '[deleted]' &&
              comment.data.body !== '[removed]')
            ?.slice(0, 3) // Top 3 comments
            ?.map(comment => comment.data.body.substring(0, 150)) // Limit length
            ?.join(' | ') || '';

          dataForGeneration[trend.title] = comments || `Post from r/${trend.subreddit} with ${trend.comments} comments and ${trend.score} upvotes`;

          // Small delay to respect rate limits
          await new Promise(resolve => setTimeout(resolve, 200));

        } catch (commentError) {
          console.error(`Failed to fetch comments for ${trend.title}:`, commentError.message);
          // Fallback to basic info
          dataForGeneration[trend.title] = `Post from r/${trend.subreddit} with ${trend.comments} comments and ${trend.score} upvotes`;
        }
      }

      // console.log('Comments data prepared:', Object.keys(dataForGeneration));

      // FIXED: Actually await the async function
      const generatedTopics = await generateBlogTopicsFromPost(dataForGeneration);

      // Map the generated topics back to the trends
      trends = trends.map(trend => {
        const matchingTopic = generatedTopics.find(topic => topic.originalTitle === trend.title);
        return {
          ...trend,
          blogTopics: matchingTopic?.generatedTopic || null,
          blogTopicsSource: matchingTopic?.source || 'not_generated',
          blogTopicsError: matchingTopic?.error || null,
          actualComments: dataForGeneration[trend.title] || null
        };
      });

      console.log('Blog topic generation completed');
    }

  //  console.log('Final trends with blog topics:', trends.length);
    res.json({
      success: true,
      count: trends.length,
      subreddit: subreddit,
      data: trends,
      metadata: {
        fetchedAt: new Date(),
        source: 'reddit',
        includesBlogTopics: generateTopics
      }
    });

  } catch (err) {
    console.error('Reddit Trend Error:', err.response?.data || err.message);

    if (err.response?.status === 401) {
      res.status(401).json({
        error: true,
        message: 'Reddit authentication failed - check credentials'
      });
    } else if (err.response?.status === 403) {
      res.status(403).json({
        error: true,
        message: 'Reddit API access forbidden - check app permissions'
      });
    } else {
      res.status(500).json({
        error: true,
        message: 'Failed to fetch Reddit trends',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
};

module.exports = { fetchTrends };