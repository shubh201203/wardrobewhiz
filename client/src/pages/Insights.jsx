import React from 'react';
import { useWardrobe } from '../context/WardrobeContext';
import { detectWardrobeGaps } from '../utils/outfitLogic';
import EmptyState from '../components/EmptyState';

export default function Insights() {
  const { state } = useWardrobe();
  const items = state.items || [];
  const gaps = detectWardrobeGaps(items);

  const totalItems = items.length;

  // Category counts
  const tops = items.filter(i => i.category === 'top').length;
  const bottoms = items.filter(i => i.category === 'bottom').length;
  const outerwear = items.filter(i => i.category === 'outerwear').length;
  const shoes = items.filter(i => i.category === 'shoes').length;

  // Real Color distribution calculation
  const neutralColors = ['white', 'black', 'grey', 'gray', 'beige', 'navy', 'cream', 'brown'];
  const neutralCount = items.filter(i => i.color && neutralColors.includes(i.color.toLowerCase())).length;
  const neutralPercentage = totalItems > 0 ? Math.round((neutralCount / totalItems) * 100) : 0;

  // Real Style/Occasion distribution
  const casualCount = items.filter(i => i.type === 'casual').length;
  const formalCount = items.filter(i => i.type === 'formal').length;
  const partyCount = items.filter(i => i.type === 'party').length;

  // Calculated Wardrobe Balance Score (out of 100)
  const categoryPresence = [tops > 0, bottoms > 0, outerwear > 0, shoes > 0].filter(Boolean).length;
  const balanceScore = totalItems === 0 ? 0 : Math.min(100, Math.round((categoryPresence / 4) * 60 + Math.min(totalItems * 4, 40)));

  return (
    <div className="flex-col gap-4 animate-fade-in">
      <div className="mb-2">
        <h2 className="m-0" style={{ fontSize: '1.5rem' }}>Style Analytics</h2>
        <p className="text-light m-0">Data-driven wardrobe intelligence</p>
      </div>

      {totalItems === 0 ? (
        <EmptyState 
          title="No Wardrobe Data Yet" 
          message="Add clothing items to your closet to unlock category analytics, palette balance, and gap alerts." 
        />
      ) : (
        <>
          {/* Health & Balance Card */}
          <div className="card glass mb-4" style={{ padding: '1.25rem' }}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="m-0 text-accent" style={{ fontSize: '1.1rem' }}>Closet Balance Score</h3>
              <span className="font-bold" style={{ fontSize: '1.25rem' }}>{balanceScore}/100</span>
            </div>
            <div className="progress mb-2" style={{ background: 'var(--border)' }}>
              <div style={{ width: `${balanceScore}%`, background: 'var(--accent)', height: '100%', borderRadius: '10px' }} />
            </div>
            <p className="text-light m-0" style={{ fontSize: '0.8rem' }}>
              Calculated from your active catalog across {totalItems} garments.
            </p>
          </div>

          {/* Category Breakdown */}
          <div className="card glass mb-4" style={{ padding: '1.25rem' }}>
            <h3 className="m-0 mb-3" style={{ fontSize: '1.1rem' }}>Category Distribution</h3>
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              <div style={{ background: 'var(--surface)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <span className="text-light" style={{ fontSize: '0.75rem' }}>Tops</span>
                <p className="m-0 font-bold" style={{ fontSize: '1.2rem' }}>{tops}</p>
              </div>
              <div style={{ background: 'var(--surface)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <span className="text-light" style={{ fontSize: '0.75rem' }}>Bottoms</span>
                <p className="m-0 font-bold" style={{ fontSize: '1.2rem' }}>{bottoms}</p>
              </div>
              <div style={{ background: 'var(--surface)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <span className="text-light" style={{ fontSize: '0.75rem' }}>Outerwear</span>
                <p className="m-0 font-bold" style={{ fontSize: '1.2rem' }}>{outerwear}</p>
              </div>
              <div style={{ background: 'var(--surface)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <span className="text-light" style={{ fontSize: '0.75rem' }}>Shoes & Other</span>
                <p className="m-0 font-bold" style={{ fontSize: '1.2rem' }}>{shoes}</p>
              </div>
            </div>
          </div>

          {/* Color & Occasion Palette */}
          <div className="card glass mb-4" style={{ padding: '1.25rem' }}>
            <h3 className="m-0 mb-3" style={{ fontSize: '1.1rem' }}>Palette & Lifestyle Mix</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-light" style={{ fontSize: '0.85rem' }}>Neutral Base (Black/White/Grey/Beige)</span>
              <span className="font-semibold" style={{ fontSize: '0.85rem' }}>{neutralPercentage}%</span>
            </div>
            <div className="progress mb-3" style={{ background: 'var(--border)' }}>
              <div style={{ width: `${neutralPercentage}%`, background: '#2d2d2d', height: '100%', borderRadius: '10px' }} />
            </div>

            <div className="flex justify-between items-center mb-1" style={{ fontSize: '0.8rem' }}>
              <span>Casual: {casualCount}</span>
              <span>Formal: {formalCount}</span>
              <span>Party: {partyCount}</span>
            </div>
          </div>

          {/* Wardrobe Gap Detector */}
          <div className="card glass mb-4" style={{ padding: '1.25rem' }}>
            <h3 className="mb-3 flex items-center gap-2 m-0" style={{ fontSize: '1.1rem' }}>
              <span className="text-accent">⚡</span> Wardrobe Gap Detector
            </h3>
            {gaps.length === 0 ? (
              <p className="text-light m-0" style={{ fontSize: '0.85rem' }}>
                Your wardrobe covers foundational categories without obvious gaps!
              </p>
            ) : (
              <div className="flex-col gap-2">
                {gaps.map((gap, i) => (
                  <div key={i} style={{ backgroundColor: 'rgba(200, 169, 126, 0.1)', padding: '0.85rem', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
                    <h4 className="m-0 mb-1" style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{gap.title}</h4>
                    <p className="m-0 text-light" style={{ fontSize: '0.8rem' }}>{gap.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
