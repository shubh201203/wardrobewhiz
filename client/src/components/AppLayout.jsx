import React from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Grid, Sparkles, PieChart, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

export default function AppLayout() {
  const { user } = useAuth();
  const initial = user?.name?.charAt(0) || 'U';
  const location = useLocation();

  return (
    <div className="container pb-nav glass">
      {/* Toast Overlay */}
      <Toaster position="top-center" toastOptions={{ style: { background: 'var(--surface)', color: 'var(--text)' } }} />

      {/* Top Header Placeholder */}
      <header className="p-4 flex justify-between items-center glass" style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.3)' }}>
        <Link to="/home">
           <img src="/logo.png" alt="WardrobeWhiz" style={{ height: '28px', mixBlendMode: 'multiply' }} />
        </Link>
        <Link to="/profile" style={{ textDecoration: 'none' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
            {initial}
          </div>
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="p-4" style={{ minHeight: 'calc(100vh - 120px)', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>

        {/* Floating AI Button */}
        <Link to="/chat">
          <motion.button
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              position: 'fixed',
              bottom: '80px',
              right: '20px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontSize: '1.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: 100
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🤖
          </motion.button>
        </Link>

        {/* Global Footer */}
        <div style={{ textAlign: 'center', margin: '2rem 0 4rem 0' }}>
          <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-light)', opacity: 0.4, margin: 0 }}>
            v1.0 MVP
          </p>
          <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-light)', opacity: 0.4 }}>
            Crafted by Shubh Sharma
          </p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '0.75rem 0',
        zIndex: 50
      }}>
        <NavItem to="/home" icon={<Home size={24} />} label="Feed" />
        <NavItem to="/wardrobe" icon={<Grid size={24} />} label="Closet" />
        <NavItem to="/generator" icon={<Sparkles size={24} />} label="Stylist" />
        <NavItem to="/insights" icon={<PieChart size={24} />} label="Insights" />
        <NavItem to="/chat" icon={<MessageSquare size={24} />} label="Chat" />
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink 
      to={to} 
      style={({ isActive }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        textDecoration: 'none',
        color: isActive ? 'var(--accent)' : 'var(--text-light)',
        transition: 'color 0.2s ease',
        fontSize: '0.7rem',
        fontWeight: isActive ? '600' : '400'
      })}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
