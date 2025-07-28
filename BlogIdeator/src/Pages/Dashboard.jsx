// src/pages/Dashboard.jsx
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import UserBlogs from '../components/features/userInfo/UserBlogs';
import SavedTrends from '../components/features/userInfo/SavedTrends';
import ProfileCard from '../components/features/userInfo/ProfileCard';
import Nav from '../components/ui/Nav';
import { useState, useEffect } from 'react';
import { FaBlog, FaBookmark, FaUserCircle } from 'react-icons/fa';
import { getTotalBlogs, getTotalSavedIdeas } from '../firebase/firebaseUtils';

export default function Dashboard() {
  const { currentUser, loading, error } = useAuth();
  const [stats, setStats] = useState({ blogs: 0, saved: 0 });

  useEffect(() => {
    async function fetchStats() {
      if (!currentUser) return;
      const [blogs, saved] = await Promise.all([
        getTotalBlogs(),
        getTotalSavedIdeas()
      ]);
      setStats({ blogs, saved });
    }
    fetchStats();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <span className="text-blue-600 font-semibold">Loading your dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <span className="text-red-600 font-semibold text-lg">Failed to load user data. Please try again later.</span>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Nav />
      <div className="w-full max-w-full sm:max-w-7xl mx-0 sm:mx-auto p-2 sm:p-4 md:p-6">
        <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 flex items-center gap-2">
              <FaUserCircle className="text-blue-600 text-xl sm:text-2xl" />
              Welcome, {currentUser.displayName || currentUser.email || 'User'}!
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">Here’s a quick overview of your activity.</p>
          </div>
          <div className="flex gap-2 sm:gap-4 flex-wrap">
            <div className="bg-white shadow rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2">
              <FaBlog className="text-blue-500" />
              <span className="font-semibold text-base">{stats.blogs}</span>
              <span className="text-gray-500 text-sm">Blogs</span>
            </div>
            <div className="bg-white shadow rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2">
              <FaBookmark className="text-blue-500" />
              <span className="font-semibold text-base">{stats.saved}</span>
              <span className="text-gray-500 text-sm">Saved</span>
            </div>
          </div>
        </div>
        {/* ProfileCard at the top  */}
        <div className="mb-6 sm:mb-8">
          <ProfileCard user={currentUser} />
        </div>
        {/* Main content: Responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-8">
          <div className="order-2 md:order-1 md:col-span-3">
            <UserBlogs />
          </div>
          <div className="order-3 md:order-2 md:col-span-1">
            <SavedTrends />
          </div>
        </div>
      </div>
    </div>
  );
}