import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner({ text = 'Analyzing your wardrobe...' }) {
  return (
    <div className="flex-col items-center justify-center flex" style={{ minHeight: '50vh' }}>
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <span>🤖</span> {text}
      </motion.div>
    </div>
  );
}
