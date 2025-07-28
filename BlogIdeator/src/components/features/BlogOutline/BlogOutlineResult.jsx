import React from 'react';
import Markdown from 'react-markdown';
import ReactMarkdown from 'react-markdown';

export default function BlogOutlineResult({ outline }) {
  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Generated Outline</h2>
      <ReactMarkdown className="whitespace-pre-line text-gray-700">
        {outline}
      </ReactMarkdown>
    </div>
  );
}
