import React from 'react';
import ReactDOM from 'react-dom/client';
import ExploreTrends from './Pages/ExploreTrends'; // Assuming the ExploreTrends component code from the previous response is in ExploreTrends.js
import BlogBuddyHome from './Pages/Home';
import GenerateBlog from './Pages/GenerateBlog';
import Success from './Pages/Success';


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './Pages/Dashboard';
import Pricing from './Pages/Pricing';
import About from './Pages/About';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<BlogBuddyHome/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/explore' element={<ExploreTrends/>}/>
            <Route path="/blogGenerator" element={<GenerateBlog />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/success" element={<Success />} />
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path='/About' element={<About/>}/>
          <Route path='/Pricing' element={<Pricing/>}/>

        </Routes>
      </AuthProvider>
    </Router>
  );
}


export default App;