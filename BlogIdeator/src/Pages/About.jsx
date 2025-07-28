import React from "react";
import Nav from "../components/ui/Nav";
import Footer from "../components/ui/Footer";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      <Nav />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 flex items-center gap-2">
          <span role="img" aria-label="notebook">📝</span> About <span className="text-blue-600">Blog_Ideator</span>
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          <strong>Blog_Ideator</strong> is a powerful full-stack platform designed for modern content creators, aspiring bloggers, and writers who crave direction, inspiration, and productivity—without the overwhelm.
        </p>
        <p className="text-gray-600 mb-6">
          In a digital age where attention is fleeting and trends evolve daily, <strong>Blog_Ideator</strong> helps you stay ahead of the curve by:
        </p>
        <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
          <li><strong>Identifying trending topics</strong> relevant to your niche and interests.</li>
          <li><strong>Suggesting blog titles and ideas</strong> powered by intelligent algorithms.</li>
          <li><strong>Generating complete blog outlines</strong> with just one click—saving time while maintaining your unique voice and vision.</li>
        </ul>
        <p className="text-gray-600 mb-8">
          Whether you're staring at a blank screen or planning your next viral blog post, Blog_Ideator makes the entire journey—from ideation to execution—effortless and exciting.
        </p>
        <hr className="my-8" />
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          What Sets Us Apart?
        </h2>
        <ul className="mb-8 space-y-4">
          <li>
            <span className="font-semibold">Trend-Aware Ideation</span><br />
            <span className="text-gray-600">No more writer's block. Blog_Ideator taps into real-time content trends and user preferences to generate blog ideas that are not only relevant but also <em>highly engaging</em>.</span>
          </li>
          <li>
            <span className="font-semibold">One-Click Outlines</span><br />
            <span className="text-gray-600">Hit "Generate" and get a structured blog outline instantly—designed to help you write faster and smarter.</span>
          </li>
          <li>
            <span className="font-semibold">More Than Just Ideas <span className="text-xs text-gray-400">(Coming Soon)</span></span><br />
            <span className="text-gray-600">We're building toward a creator-first future. Upcoming features include:</span>
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-600">
              <li><span role="img" aria-label="publish">📤</span> <strong>One-Click Publishing</strong> to platforms like Medium, WordPress, Hashnode, and more.</li>
              <li><span role="img" aria-label="analytics">📊</span> <strong>Personal Analytics</strong> to track your performance, growth, and engagement.</li>
              <li><span role="img" aria-label="brain">🧠</span> <strong>Smart Topic Suggestions</strong> based on your past writings and areas of interest.</li>
            </ul>
          </li>
        </ul>
        <hr className="my-8" />
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          Our Vision
        </h2>
        <p className="text-gray-700 mb-8">
          We believe writing should be <strong>joyful</strong>, <strong>insightful</strong>, and <strong>frictionless</strong>. Whether you're a seasoned blogger or just starting out, Blog_Ideator is here to support your voice, amplify your creativity, and unlock new possibilities in your content journey.
        </p>
        <hr className="my-8" />
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span role="img" aria-label="writing hand">✍️</span> Let's Ideate the Future
        </h2>
        <p className="text-gray-700">
          We’re just getting started. Join us as we redefine what it means to create and publish meaningful content in the 21st century.
        </p>
      </main>
      <Footer />
    </div>
  );
}
export default About;