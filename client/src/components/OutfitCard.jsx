import React from 'react';
import { motion } from 'framer-motion';

export default function OutfitCard({ outfit }) {
  const matchScore = outfit.confidence ? parseInt(outfit.confidence) : 90;

  return (
    <motion.div 
      className="card mb-4 glass outfit-card" 
      style={{ padding: '0' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="p-4 flex justify-center gap-2 flex-wrap" style={{ minHeight: '120px' }}>
          {outfit.outerwear && <img src={outfit.outerwear.image} alt={outfit.outerwear.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', zIndex: 2 }} />}
          {outfit.top && <img src={outfit.top.image} alt={outfit.top.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', zIndex: 2 }} />}
          {outfit.bottom && <img src={outfit.bottom.image} alt={outfit.bottom.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', zIndex: 2 }} />}
        </div>

        <div className="p-4" style={{ color: 'white' }}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="m-0 text-white" style={{ fontSize: '1.2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{outfit.name}</h3>
          </div>
          <p className="m-0 mb-2 font-semibold" style={{ fontSize: '0.85rem', textTransform: 'capitalize', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Scenario: {outfit.scenario}
          </p>
          
          <div className="mb-3">
             <div className="flex justify-between items-center mb-1">
               <span style={{ fontSize: '0.75rem', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Match Score</span>
               <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{matchScore}%</span>
             </div>
             <div className="progress" style={{ background: 'rgba(255,255,255,0.3)' }}>
               <motion.div 
                 initial={{ width: 0 }} 
                 animate={{ width: `${matchScore}%` }} 
                 transition={{ duration: 1, delay: 0.2 }}
               />
             </div>
          </div>

          <p className="m-0" style={{ fontSize: '0.9rem', fontStyle: 'italic', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
            "{outfit.reason}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}
