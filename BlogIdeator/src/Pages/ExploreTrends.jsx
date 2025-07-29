import React, { useState, useEffect } from 'react';
import Footer from '../components/ui/Footer';
import Nav from '../components/ui/Nav';
import { useNavigate } from 'react-router-dom';
import { saveIdea } from '../firebase/firebaseUtils';
import axios from 'axios'; // Import axios

export default function ExploreTrends() {
  const [topic, setTopic] = useState('tech');
  const [timeframe, setTimeframe] = useState('day'); // Default to 'day' as per backend API 't' param
  const [savedTrends, setSavedTrends] = useState([]); 
  const [trendsData, setTrendsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const topicMap = {
    tech: ['technology', 'programming', 'compsci', 'tech', 'learnprogramming'],
    writing: ['writing', 'FanFiction', 'selfpublish', 'writingprompts'],
    entrepreneur: ['Entrepreneur', 'startups', 'smallbusiness', 'EntrepreneurRideAlong'],
    science: ['science', 'space', 'askscience', 'Physics'],
    books: ['books', 'suggestmeabook', 'Fantasy', 'truelit', 'audiobooks'],
    finance: ['personalfinance', 'stocks', 'CryptoCurrency', 'financialindependence'],
    productivity: ['productivity', 'getdisciplined', 'selfimprovement', 'Notion'],
    psychology: ['psychology', 'Stoicism', 'socialskills', 'CasualConversation'],
    health: ['nutrition', 'Fitness', 'bodyweightfitness', 'running'],
    ai: ['ArtificialIntelligence', 'ChatGPT', 'MachineLearning', 'DeepLearning'],
    education: ['education', 'learnprogramming', 'explainlikeimfive', 'AskAcademia'],
    career: ['careerguidance', 'jobs', 'resumes', 'cscareerquestions'],
    gaming: ['gaming', 'pcgaming', 'gamedev', 'Games'],
    marketing: ['marketing', 'digital_marketing', 'SEO', 'content_marketing']
  };

  const getTopicSubreddits = (topic) => {
    const subreddits = topicMap[topic];
    if (!subreddits || subreddits.length === 0) {
      console.warn(`No subreddits defined for topic: ${topic}, defaulting to 'popular'.`);
      return 'popular';
    }
    return subreddits[Math.floor(Math.random() * subreddits.length)];
  };

  useEffect(() => {
    const fetchTrends = async () => {
      setLoading(true);
      setError(null); 
      try {
        const subreddit = getTopicSubreddits(topic); // Get a random subreddit for the chosen topic

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

        const response = await axios.get(`${apiUrl}/api/trends`, {
          params: {
            subreddit: subreddit,
            timeframe: timeframe,
          }
        });

        // Axios automatically parses JSON and puts it in response.data
        const { data: redditData } = response.data; 


        const formatted = redditData.map((item) => ({
          id: item.id, 
          title: item.blogTopics, 
          volume: item.score ? item.score.toLocaleString() : 'N/A', 
          comments: item.comments, 
        }));
        setTrendsData(formatted);
      } catch (err) {
        console.error('Failed to fetch Reddit trends (frontend):', err);
        // Axios error object structure:
        const errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred.';
        setError(`Failed to load trends: ${errorMessage}`);

        // Fallback data in case of error
        setTrendsData([
          { id: 'fallback1', title: 'Loading Failed: Check API', volume: 'N/A', comments: 0 },
          { id: 'fallback2', title: 'Using Placeholder Data', volume: 'N/A', comments: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, [topic, timeframe]); 

  const handleSaveTrend = (trendTitle) => {
    if (!savedTrends.includes(trendTitle)) {
      const updatedSavedTrends = [...savedTrends, trendTitle];
      setSavedTrends(updatedSavedTrends);
      saveIdea({content: trendTitle}); // Pass the updated array
    }
  };

  const navigate = useNavigate();

  const handleGenerateBlog = async (topicTitle) => {
    try {
      navigate('/blogGenerator', { state: { topic: topicTitle } }); 
    } catch (err) {
      alert(`Blog generation failed: ${err.message}`);
    }
  };

  return (
    <>
      <Nav />

      <div className="bg-gray-50 py-6 px-4 md:px-10 min-h-screen"> 
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Topic Ideas</h1>

        <div className="flex items-center gap-4 mb-6 flex-wrap"> 
          {/* Topic selector */}
          <div className="flex gap-2 flex-wrap">
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="px-3 py-1.5 rounded border border-gray-300 bg-white text-sm shadow-sm" 
              size={1}
            >
              {Object.entries(topicMap).map(([tKey, tValue]) => (
                <option value={tKey} key={tKey}>{tKey.charAt(0).toUpperCase() + tKey.slice(1)}</option> 
              ))}
            </select>
          </div>
          {/* Timeframe dropdown */}
          <div className="ml-auto">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-3 py-1.5 rounded border border-gray-300 bg-white text-sm shadow-sm"
            >
              {/* Note: 'hour', 'day', 'week', 'month', 'year', 'all' are valid for Reddit API's 't' param with /top or /controversial */}
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {loading && <p>Loading blog topics...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && trendsData.length === 0 && !error && (
              <p className="text-gray-500">No blog-worthy topics found for this category and timeframe.</p>
            )}
            {!loading && trendsData.length > 0 &&
              trendsData.map((trend) => (
                trend.title!=null?(<div
                  key={trend.id} // Use unique ID from data
                  className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <h2 className="text-lg font-semibold text-blue-800">{trend.title}</h2>
                  <div className="text-sm text-gray-500 mt-1">
                    <span className="mr-3">🔥 {trend.volume} engagement</span>
                    <span>💬 {trend.comments} comments</span>
                  </div>
                  <div className="mt-2 flex gap-3">
                    <button
                      onClick={() => handleSaveTrend(trend.title)}
                      className={`text-sm px-3 py-1 rounded ${
                        savedTrends.includes(trend.title)
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                      disabled={savedTrends.includes(trend.title)}
                    >
                      {savedTrends.includes(trend.title) ? 'Saved' : 'Save Topic'}
                    </button>
                    <button
                      onClick={() => handleGenerateBlog(trend.title)}
                      className="text-sm border border-blue-500 text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition-colors duration-200"
                    >
                      Write Blog
                    </button>
                  </div>
                </div>):""
              ))}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-fit"> {/* Added h-fit */}
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Saved Topics</h3>
            {savedTrends.length === 0 ? (
              <p className="text-gray-500 text-sm italic">No saved topics yet.</p>
            ) : (
              <ul className="space-y-2">
                {savedTrends.map((trendTitle, idx) => (
                  <li key={idx} className="text-blue-700 text-sm flex items-center gap-1">
                    • {trendTitle}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}