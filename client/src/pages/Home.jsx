import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWardrobe } from '../context/WardrobeContext';
import { Link } from 'react-router-dom';
import { initialOutfits } from '../data/mockData';
import { Sparkles, Grid, MessageSquare, ArrowRight } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const { state } = useWardrobe();
  const availableOutfits = state.outfits && state.outfits.length > 0 ? state.outfits : initialOutfits;
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentOutfit = availableOutfits[currentIndex] || initialOutfits[0];

  const generateAnother = () => {
    const nextIndex = (currentIndex + 1) % availableOutfits.length;
    setCurrentIndex(nextIndex);
  };

  const totalItems = state.items ? state.items.length : 0;
  const optimizationPercent = Math.min(100, Math.max(30, totalItems * 10));

  return (
    <div className="flex-col gap-4 animate-fade-in">
      <div className="mb-2 delay-100 animate-fade-in">
        <h2 className="m-0 font-heading" style={{ fontSize: '1.5rem' }}>Today's Style</h2>
        <p className="text-light m-0">
          Good morning, <span className="text-accent">{user?.name || 'Stylist'}</span>. Here's your daily briefing.
        </p>
      </div>

      {/* Outfit of the Day Card */}
      <div className="card delay-200 animate-fade-in" style={{ backgroundColor: 'var(--text)', color: 'var(--primary)', padding: '1.5rem' }}>
        <div className="flex justify-between items-center mb-2">
          <span className="badge" style={{ backgroundColor: 'rgba(200, 169, 126, 0.2)', color: 'var(--accent)', border: 'none' }}>
            Daily Pick
          </span>
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            {currentOutfit?.confidence || '95%'} Match
          </span>
        </div>
        
        <h3 className="font-heading m-0 text-accent mb-1" style={{ fontSize: '1.35rem' }}>
          {currentOutfit?.name || 'Everyday Minimalist'}
        </h3>
        <p className="mb-3" style={{ fontSize: '0.85rem', opacity: 0.85, fontStyle: 'italic' }}>
          "{currentOutfit?.reason || 'Carefully balanced color tones and silhouette for comfortable elegance.'}"
        </p>

        {/* Garment Preview Thumbnails */}
        <div className="flex gap-2 mb-4">
          {currentOutfit?.top?.image && (
            <img src={currentOutfit.top.image} alt={currentOutfit.top.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', background: '#333' }} />
          )}
          {currentOutfit?.bottom?.image && (
            <img src={currentOutfit.bottom.image} alt={currentOutfit.bottom.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', background: '#333' }} />
          )}
          {currentOutfit?.outerwear?.image && (
            <img src={currentOutfit.outerwear.image} alt={currentOutfit.outerwear.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', background: '#333' }} />
          )}
        </div>

        <button className="btn btn-primary" onClick={generateAnother} style={{ width: '100%' }}>
          Shuffle Next Look
        </button>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
        <Link to="/wardrobe" style={{ textDecoration: 'none' }}>
          <div className="card text-center" style={{ padding: '0.85rem 0.5rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <Grid size={22} className="text-accent mb-1" style={{ margin: '0 auto' }} />
            <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text)' }}>Closet</span>
          </div>
        </Link>
        <Link to="/generator" style={{ textDecoration: 'none' }}>
          <div className="card text-center" style={{ padding: '0.85rem 0.5rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <Sparkles size={22} className="text-accent mb-1" style={{ margin: '0 auto' }} />
            <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text)' }}>Stylist</span>
          </div>
        </Link>
        <Link to="/chat" style={{ textDecoration: 'none' }}>
          <div className="card text-center" style={{ padding: '0.85rem 0.5rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <MessageSquare size={22} className="text-accent mb-1" style={{ margin: '0 auto' }} />
            <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text)' }}>AI Chat</span>
          </div>
        </Link>
      </div>

      {/* Wardrobe Status Card */}
      <div className="card delay-300 animate-fade-in glass">
        <div className="flex justify-between items-center mb-4">
           <h3 className="m-0" style={{ fontSize: '1.1rem' }}>Wardrobe Status</h3>
           <Link to="/avatar" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="badge" style={{ backgroundColor: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', cursor: 'pointer' }}>
                Avatar Fit <ArrowRight size={12} />
              </span>
           </Link>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-light">Digitized Closet Items</span>
          <span className="font-bold">{totalItems}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-light">Curated Combinations</span>
          <span className="font-bold">{availableOutfits.length}</span>
        </div>
        <hr style={{ margin: '1rem 0', borderColor: 'var(--border)', borderStyle: 'solid', borderWidth: '1px 0 0 0' }} />
        <div className="flex justify-between items-center mb-1">
          <span className="text-light" style={{ fontSize: '0.8rem' }}>Closet Versatility Index</span>
          <span className="font-bold text-accent" style={{ fontSize: '0.8rem' }}>{optimizationPercent}%</span>
        </div>
        <div className="progress" style={{ background: 'var(--border)' }}>
          <div style={{ width: `${optimizationPercent}%`, background: 'var(--accent)', height: '100%', borderRadius: '10px' }} />
        </div>
      </div>
    </div>
  );
}
