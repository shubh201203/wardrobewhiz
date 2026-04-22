import React, { useState } from 'react';
import { useWardrobe } from '../context/WardrobeContext';
import OutfitCard from '../components/OutfitCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { filterOutfitsByScenario } from '../utils/outfitLogic';

export default function OutfitGenerator() {
  const { state, analyzeWardrobe } = useWardrobe();
  const [scenario, setScenario] = useState('all');
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = async (selectedScenario) => {
    setScenario(selectedScenario);
    setHasGenerated(false);
    await analyzeWardrobe();
    setHasGenerated(true);
  };

  if (state.isAnalyzing) {
    return (
      <div className="container flex-col items-center justify-center">
        <LoadingSpinner text="Analyzing your wardrobe & matching colors..." />
      </div>
    );
  }

  const generatedOutfits = hasGenerated ? filterOutfitsByScenario(state.outfits, scenario) : [];

  return (
    <div className="flex-col animate-fade-in">
      <div className="mb-4">
        <h2 className="m-0" style={{ fontSize: '1.5rem' }}>AI Stylist</h2>
        <p className="text-light m-0">What's the occasion?</p>
      </div>

      {/* Scenario Mode */}
      <div className="grid mb-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
        {['casual', 'college', 'interview', 'date', 'party'].map(s => (
          <button 
            key={s}
            className="btn btn-secondary"
            onClick={() => handleGenerate(s)}
            style={{ textTransform: 'capitalize', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <span style={{ fontSize: '1.25rem' }}>{s === 'interview' ? '👔' : s === 'party' ? '🎉' : s === 'date' ? '🥂' : s === 'college' ? '🎒' : '☕'}</span>
            {s}
          </button>
        ))}
      </div>

      {hasGenerated && (
        <div className="animate-fade-in">
          <h3 className="mb-4 text-accent">Top Recommendations</h3>
          {generatedOutfits.length === 0 ? (
            <EmptyState 
              title="No Outfits Found" 
              message={`We couldn't build a ${scenario} outfit with your current wardrobe.`} 
            />
          ) : (
            generatedOutfits.map(outfit => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
