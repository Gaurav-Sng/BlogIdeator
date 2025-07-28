import React, { useState } from 'react';
import BlogOutlineResult from '../components/features/BlogOutline/BlogOutlineResult';
import BlogOutlineForm from '../components/features/BlogOutline/BlogOutlineForm';
import Footer from '../components/ui/Footer';
import Nav from '../components/ui/Nav';
import { useLocation } from 'react-router-dom';
import { saveBlog } from '../firebase/firebaseUtils';
// import { onSnapshot } from 'firebase/firestore';


export default function GenerateBlog() {
  const [outline, setOutline] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const location = useLocation();
  const topic =  location.state?.topic.title || ""||location.state?.topic;
const handleSaveBlog = async (topic,outline) => {
  console.log(topic);
  const blog = {
    title: topic,
    content:outline,
    topic: topic,
    createdAt:new Date().toISOString(),
    status:'draft'
  };
 
  await saveBlog(blog);
};
  const handleOutlineGenerated = (result) => {
    setOutline(result);
    handleSaveBlog(topic,result);
    setIsGenerating(false);
  };
  return (
    <>
      <Nav />
      <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-indigo-100 to-pink-100">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          AI Blog Outline Generator
        </h1>
        <BlogOutlineForm
          setOutline={handleOutlineGenerated}
          setIsGenerating={setIsGenerating}
          title={topic}
        />
        {isGenerating && !outline && (
          <div className="max-w-2xl mx-auto mt-8 p-4 text-center">
            <p>Creating your perfect outline...</p>
          </div>
        )}
        {outline && <BlogOutlineResult outline={outline} />}
      </div>
      <Footer />
    </>
  );
}

