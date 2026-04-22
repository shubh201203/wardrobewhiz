import React from 'react';
import { useWardrobe } from '../context/WardrobeContext';
import { detectWardrobeGaps } from '../utils/outfitLogic';

export default function Insights() {
  const { state } = useWardrobe();
  const gaps = detectWardrobeGaps(state.items);

  return (
    <div className="flex-col gap-4 animate-fade-in">
      <div className="mb-2">
        <h2 className="m-0" style={{ fontSize: '1.5rem' }}>Style Analytics</h2>
        <p className="text-light m-0">Predictive wardrobe analysis</p>
      </div>

      <div className="card mb-4">
        <h3 className="mb-4 flex items-center gap-2"><span className="text-accent">⚡</span> Wardrobe Gap Detector</h3>
        {gaps.length === 0 ? (
          <p className="text-light m-0">Your wardrobe is perfectly balanced!</p>
        ) : (
          <div className="flex-col gap-2">
            {gaps.map((gap, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(255,0,0,0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #ff4444' }}>
                <h4 className="m-0 mb-1" style={{ fontSize: '0.9rem', color: '#cc0000' }}>{gap.title}</h4>
                <p className="m-0 text-light" style={{ fontSize: '0.85rem' }}>{gap.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <h3 className="mb-2">General Insights</h3>
      {state.insights.map(insight => (
        <div key={insight.id} className="card mb-2" style={{ padding: '1rem' }}>
          <h4 className="m-0 mb-1" style={{ fontSize: '1rem' }}>{insight.title}</h4>
          <p className="m-0 text-light" style={{ fontSize: '0.9rem' }}>{insight.text}</p>
        </div>
      ))}
    </div>
  );
}
