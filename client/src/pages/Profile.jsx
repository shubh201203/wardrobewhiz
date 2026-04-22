import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex-col gap-4 animate-fade-in">
      <div className="mb-4 text-center">
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', margin: '0 auto 1rem auto' }}>
          {user?.name?.charAt(0) || 'U'}
        </div>
        <h2 className="m-0" style={{ fontSize: '1.5rem' }}>{user?.name || 'User'}</h2>
        <p className="text-light m-0">Fashion Enthusiast</p>
      </div>

      <div className="card mb-4" style={{ padding: '1rem' }}>
        <h3 className="mb-4" style={{ fontSize: '1.1rem' }}>Account Details</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-light">Email</span>
          <span className="font-semibold">user@wardrobewhiz.com</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-light">Subscription</span>
          <span className="badge">Free Tier</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-light">Style Profile</span>
          <span className="font-semibold" style={{ textTransform: 'capitalize' }}>Minimalist</span>
        </div>
      </div>

      <button className="btn btn-secondary btn-full" style={{ color: 'red', borderColor: '#ffcccc' }} onClick={handleLogout}>
        Sign Out
      </button>


    </div>
  );
}
