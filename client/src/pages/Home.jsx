import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWardrobe } from '../context/WardrobeContext';
import { Link } from 'react-router-dom';
import { initialOutfits } from '../data/mockData';

export default function Home() {
  const { user } = useAuth();
  const { state } = useWardrobe();
  const [currentOutfit, setCurrentOutfit] = useState(initialOutfits[0]);

  const generateAnother = () => {
    const randomIndex = Math.floor(Math.random() * initialOutfits.length);
    setCurrentOutfit(initialOutfits[randomIndex]);
  };

  return (
    <div className="flex-col gap-4 animate-fade-in">
      <div className="mb-2 delay-100 animate-fade-in">
        <h2 className="m-0 font-heading" style={{ fontSize: '1.5rem' }}>Today's Style</h2>
        <p className="text-light m-0">Good morning, <span className="text-accent">{user?.name}</span>. Here's your briefing.</p>
      </div>

      <div className="card delay-200 animate-fade-in text-center" style={{ backgroundColor: 'var(--text)', color: 'var(--primary)' }}>
        <h3 className="font-heading m-0 text-accent mb-2" style={{ fontSize: '1.25rem' }}>Outfit of the Day</h3>
        <p className="mb-4" style={{ fontSize: '0.9rem' }}>{currentOutfit.name}</p>
        <button className="btn btn-primary" onClick={generateAnother}>Generate another</button>
      </div>

      <div className="card delay-300 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
           <h3 className="m-0" style={{ fontSize: '1.1rem' }}>Wardrobe Status</h3>
           <Link to="/avatar" style={{ textDecoration: 'none' }}>
              <span className="badge" style={{ backgroundColor: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)' }}>✦ Try 3D Avatar</span>
           </Link>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>Total Items</span>
          <span className="font-bold">{state.items.length}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>AI Saved Outfits</span>
          <span className="font-bold">{state.outfits.length}</span>
        </div>
        <hr style={{ margin: '1rem 0', borderColor: 'var(--border)', borderStyle: 'solid', borderWidth: '1px 0 0 0' }} />
        <p className="text-light" style={{ fontSize: '0.85rem' }}>Your closet is 80% optimized for College scenario.</p>
      </div>
    </div>
  );
}
