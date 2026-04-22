import React from 'react';

export default function EmptyState({ title, message, actionText, onAction }) {
  return (
    <div className="flex-col items-center justify-center p-6 text-center animate-fade-in" style={{ minHeight: '40vh' }}>
      <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(200, 169, 126, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1.5rem' }}>✨</span>
      </div>
      <h3 className="mb-2">{title}</h3>
      <p className="text-light mb-6">{message}</p>
      {actionText && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
}
