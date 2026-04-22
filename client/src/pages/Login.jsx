import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Login() {
  const { isInitializing, login, isLoggingIn } = useAuth();
  const [username, setUsername] = useState('Fashionista');
  const [isSignUp, setIsSignUp] = useState(false);

  if (isInitializing) {
    return (
      <div className="container flex-col items-center justify-center p-6 text-center animate-fade-in" style={{ height: '100vh', background: 'var(--primary)', position: 'relative' }}>
        <img src="/logo.png" alt="WardrobeWhiz Logo" style={{ width: '250px', maxWidth: '80%', marginBottom: '1rem' }} />
        <p className="font-heading" style={{ color: 'var(--text-light)', letterSpacing: '1px', fontSize: '0.9rem' }}>Where Fashion meets your Closet !</p>
        
        <div style={{ position: 'absolute', bottom: '2rem', width: '100%', textAlign: 'center' }}>
          <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-light)', opacity: 0.5 }}>Crafted by Shubh Sharma</p>
        </div>
      </div>
    );
  }

  if (isLoggingIn) {
    return (
      <div className="container flex-col items-center justify-center">
        <LoadingSpinner text="Setting up your AI stylist..." />
      </div>
    );
  }

  return (
    <div className="container flex-col p-6 animate-fade-in" style={{ justifyContent: 'center', position: 'relative' }}>
      <div className="text-center mb-6 mt-4">
        <img src="/logo.png" alt="WardrobeWhiz" style={{ width: '180px', marginBottom: '0.5rem', mixBlendMode: 'multiply' }} />
        <p className="font-heading mb-4" style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>Where Fashion meets your Closet !</p>
        <h1 className="font-heading m-0" style={{ fontSize: '1.5rem' }}>{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
        <p className="text-light" style={{ fontSize: '0.9rem' }}>{isSignUp ? 'Join your digital closet' : 'Log in to your digital closet'}</p>
      </div>
      
      <div className="card">
        <div className="mb-4">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Username</label>
          <input 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontFamily: 'var(--font-primary)' }}
          />
        </div>
        {isSignUp && (
          <div className="mb-4">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
            <input 
              type="email"
              placeholder="you@example.com"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontFamily: 'var(--font-primary)' }}
            />
          </div>
        )}
        <div className="mb-6">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
          <input 
            type="password"
            defaultValue="password123"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontFamily: 'var(--font-primary)' }}
          />
        </div>
        <button className="btn btn-primary btn-full mb-4" onClick={() => login(username)}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <p className="text-center text-light" style={{ fontSize: '0.85rem' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"} <button className="text-accent" style={{ background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? 'Sign In' : 'Sign Up'}</button>
        </p>
      </div>
    </div>
  );
}
