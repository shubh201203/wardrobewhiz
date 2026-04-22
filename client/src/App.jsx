import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import Wardrobe from './pages/Wardrobe';
import OutfitGenerator from './pages/OutfitGenerator';
import Insights from './pages/Insights';
import ChatStylist from './pages/ChatStylist';
import AvatarFit from './pages/AvatarFit';
import Profile from './pages/Profile';

import { playSoftTap } from './utils/audio';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/home" />;
  return children;
}

export default function App() {
  React.useEffect(() => {
    const handleGlobalClick = (e) => {
      const isInteractive = e.target.closest('button, a, .card, input');
      if (isInteractive) {
        playSoftTap();
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/generator" element={<OutfitGenerator />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/chat" element={<ChatStylist />} />
          <Route path="/avatar" element={<AvatarFit />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
