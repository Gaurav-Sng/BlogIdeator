import { Link } from 'react-router-dom';

const TrendCard = ({ trend }) => {
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      {/* Card Content */}
      <div className="p-4 flex flex-col h-full">
        {/* Trend Title */}
        <div className="flex items-center mb-2">
          <span className="w-5 h-5 bg-blue-500 rounded-full mr-2 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3 text-white" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414-1.414L15.586 7H12z" clipRule="evenodd" />
            </svg>
          </span>
          <h3 className="font-semibold text-gray-800 line-clamp-2">
            {trend.title?.query || 'Trending Topic'}
          </h3>
        </div>

        {/* Traffic & Location */}
        <div className="flex gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {trend.formattedTraffic || '740K'}
          </span>
          <span className="px-2 py-1 border border-gray-200 text-gray-600 text-xs font-medium rounded-full">
            {trend.country || 'United States'}
          </span>
        </div>

        {/* Related Queries */}
        {trend.relatedQueries?.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Related searches:</p>
            <div className="flex flex-wrap gap-1">
              {trend.relatedQueries.slice(0, 3).map((query, i) => (
                <span 
                  key={i}
                  className="px-2 py-0.5 text-xs border border-gray-200 rounded-full text-gray-600"
                >
                  {query}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link
          to={`/generate-blog?topic=${encodeURIComponent(trend.title?.query)}`}
          className="mt-auto w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-md text-sm text-center flex items-center justify-center transition-all duration-200"
        >
          Generate Blog
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default TrendCard;