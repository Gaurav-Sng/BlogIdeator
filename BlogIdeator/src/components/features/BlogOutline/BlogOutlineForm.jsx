import React, { useState } from 'react';
import { generateBlogOutline } from '../../../lib/api';
import { canGenerateBlog } from '../../../firebase/firebaseUtils';

export default function BlogOutlineForm({ setOutline, title }) {
  const [topic, setTopic] = useState(title);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!topic) {
      setError('Please enter a topic');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Enforcing plan-based limit
      if (!(await canGenerateBlog())) {
        setError('You have reached your monthly blog generation limit for your plan.');
        setLoading(false);
        return;
      }
      const result = await generateBlogOutline(topic, userInput);
      setOutline(result.content);
    } catch (err) {
      setError(err.message || 'Failed to generate outline');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4">
      <input
        className="w-full p-3 border border-gray-300 rounded-lg"
        type="text"
        placeholder="Enter blog topic (e.g. AI in Healthcare)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg"
        placeholder="Optional: Add context or adjust prompt"
        rows="4"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <button
        className={`w-full text-white py-3 rounded-lg font-semibold transition ${
          loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : 'Generate Outline'}
      </button>
    </div>
  );
}