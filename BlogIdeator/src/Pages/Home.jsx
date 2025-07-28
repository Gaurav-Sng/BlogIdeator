import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/77755e565ef7ddbff2546231cd8732bf.png";
import Footer from "../components/ui/Footer";
import Nav from "../components/ui/Nav";
import { useNavigate } from "react-router-dom";
const BlogBuddyHome = () => {
  // Sample trending topics data
  const trendingTopics = [
    { id: 1, title: "AI in Healthcare", score: 95, category: "Technology" },
    { id: 2, title: "Sustainable Fashion", score: 87, category: "Lifestyle" },
    { id: 3, title: "Remote Work Tools", score: 82, category: "Business" },
    { id: 4, title: "Plant-Based Recipes", score: 78, category: "Food" },
  ];

  // Feature cards data
  const features = [
    {
      id: 1,
      icon: "📊",
      title: "Real-time Trends",
      description:
        "Access the latest trending topics from Google Trends updated daily.",
    },
    {
      id: 2,
      icon: "🎯",
      title: "Niche Targeting",
      description:
        "Get blog ideas tailored specifically to your content niche and audience.",
    },
    {
      id: 3,
      icon: "📝",
      title: "AI-Powered Outlines",
      description: "Generate comprehensive blog outlines with a single click.",
    },
    {
      id: 4,
      icon: "🚀",
      title: "Save Time & Effort",
      description:
        "Focus on writing great content instead of searching for ideas.",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Navigation */}
      <Nav />
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col md:flex-row items-center gap-8 md:gap-0">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center sm:text-left">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6">
            Create Blogs That Ride the Trend – Powered by AI
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
            Let your ideas spark from real-time Google Trends and AI-powered
            content generators.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
            <Link to='/blogGenerator' className="bg-white border border-gray-300 rounded-md px-4 sm:px-6 py-2.5 sm:py-3 hover:bg-gray-100 transition-colors text-center text-base">
              Try Blog Buddy
            </Link>
            <Link
              to="/explore"
              className="bg-blue-500 text-white rounded-md px-4 sm:px-6 py-2.5 sm:py-3 hover:bg-blue-600 transition-colors text-center text-base"
            >
              Explore Trends
            </Link>
          </div>
        </div>

        {/* Image Container - Fire Icon Only */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="mt-5 md:mt-0 md:mr-10 max-w-xs sm:max-w-md w-full">
            <img
              src={heroImage}
              alt="Blog content creation"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      {/* Trending Now Section */}
      <div className="bg-white py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">🔥 Trending Now</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Explore what's hot on Google Trends right now
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trendingTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex justify-between items-center mb-2 sm:mb-3">
                    <span className="text-xs font-medium text-gray-500">
                      {topic.category}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {topic.score}%
                    </span>
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{topic.title}</h3>
                  <button className="text-blue-600 text-xs sm:text-sm font-medium hover:text-blue-800 flex items-center" onClick={()=>navigate('/blogGenerator', { state: {topic } })}
                  >
                  Generate ideas
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
              </div>
            ))}
        </div>
      </div>
    </div>

      {/* Features Section */ }
  <div className="py-10 sm:py-16 bg-gradient-to-r from-blue-50 to-blue-100">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          ✅ Why Choose TrendBuddy
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Supercharge your content creation with these powerful features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-xl p-4 sm:p-6 shadow-md"
          >
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-4">{feature.icon}</div>
            <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>

  <div className="bg-white py-10 sm:py-16">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">👣 How It Works</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Three simple steps to create trend-driven content
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="bg-blue-50 rounded-xl p-6 sm:p-8 text-center max-w-xs w-full relative mb-4 md:mb-0">
          <div className="bg-blue-500 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg font-bold absolute -top-4 left-1/2 transform -translate-x-1/2">
            1
          </div>
          <div className="mb-2 sm:mb-4 text-2xl sm:text-4xl">🎯</div>
          <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2">Pick your niche</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Select your content area and target audience to get personalized
            suggestions.
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 sm:p-8 text-center max-w-xs w-full relative mb-4 md:mb-0">
          <div className="bg-blue-500 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg font-bold absolute -top-4 left-1/2 transform -translate-x-1/2">
            2
          </div>
          <div className="mb-2 sm:mb-4 text-2xl sm:text-4xl">🔍</div>
          <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2">Get trend-driven ideas</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            We'll analyze current trends and generate blog ideas tailored to
            your niche.
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 sm:p-8 text-center max-w-xs w-full relative">
          <div className="bg-blue-500 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg font-bold absolute -top-4 left-1/2 transform -translate-x-1/2">
            3
          </div>
          <div className="mb-2 sm:mb-4 text-2xl sm:text-4xl">📝</div>
          <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2">Generate your blog</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Use our AI-powered tools to create, edit, and publish your blog post in minutes.
          </p>
        </div>
      </div>
    </div>
  </div>

  
     <Footer/>
    </div >
  );
};

export default BlogBuddyHome;
