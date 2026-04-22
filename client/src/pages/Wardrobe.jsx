import React, { useState, useRef } from 'react';
import { useWardrobe } from '../context/WardrobeContext';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import { Plus, UploadCloud, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Wardrobe() {
  const { state, addItemToDb, deleteItemFromDb } = useWardrobe();
  const [filter, setFilter] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const filteredItems = filter === 'all' ? state.items : state.items.filter(i => i.category === filter);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const imageBlob = URL.createObjectURL(file);
      
      const res = await fetch("https://wardrobewhiz.onrender.com/api/upload", {
        method: "POST",
        body: formData
      });
      
      const data = await res.json();
      
      if (res.ok && data.predictions) {
        const bestGuess = data.predictions[0].className;
        let category = 'top';
        if (bestGuess.toLowerCase().includes('jean') || bestGuess.toLowerCase().includes('pant') || bestGuess.toLowerCase().includes('trouser')) category = 'bottom';
        else if (bestGuess.toLowerCase().includes('coat') || bestGuess.toLowerCase().includes('jacket')) category = 'outerwear';
        else if (bestGuess.toLowerCase().includes('shoe') || bestGuess.toLowerCase().includes('sneaker')) category = 'shoes';

        const newItem = {
          id: Date.now().toString(),
          name: `AI Detected: ${bestGuess.split(',')[0]}`,
          category,
          color: 'Unknown',
          type: 'casual',
          image: imageBlob
        };

        addItemToDb(newItem);
        toast.success(`MobileNet identified: ${bestGuess.split(',')[0]}`);
      } else {
        toast.error("Frontend Model failed to identify.");
      }
    } catch (error) {
      toast.error("Failed to connect to backend upload route.");
    }
    setIsUploading(false);
  };

  if (state.isLoading) {
    return <LoadingSpinner text="Loading your wardrobe..." />;
  }

  if (state.error) {
    return (
      <div className="flex-col animate-fade-in gap-4 p-4 text-center items-center justify-center" style={{ minHeight: '50vh' }}>
        <p className="text-accent font-bold" style={{ fontSize: '1.2rem' }}>⚠️ Oops!</p>
        <p>{state.error}</p>
        <button className="btn btn-secondary mt-4" onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="flex-col gap-4 animate-fade-in pb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="m-0 font-heading" style={{ fontSize: '1.5rem' }}>Your Wardrobe</h2>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*" 
          onChange={handleFileChange} 
        />
        
        <button 
          className="btn btn-primary" 
          style={{ padding: '0.4rem 0.8rem', borderRadius: '20px' }}
          onClick={handleUploadClick}
          disabled={isUploading}
        >
          {isUploading ? <UploadCloud size={16} className="animate-spin" /> : <Plus size={16} />} 
          {isUploading ? ' Analyzing...' : ' Add'}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2" style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {['all', 'top', 'bottom', 'outerwear', 'shoes'].map(c => (
          <button 
            key={c}
            onClick={() => setFilter(c)}
            className={`btn ${filter === c ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.4rem 1rem', borderRadius: '20px', textTransform: 'capitalize', fontSize: '0.85rem', flexShrink: 0 }}
          >
            {c}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <EmptyState 
          title="No Items Found" 
          message="Start building your wardrobe to unlock AI styling." 
          actionText="Add Item" 
          onAction={handleUploadClick}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {filteredItems.map((item, i) => (
            <div key={item.id} className={`card delay-${(i%3)*100} animate-fade-in`} style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              
              <button 
                onClick={() => deleteItemFromDb(item.id)}
                style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,0,0,0.8)', color: 'white', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer' }}
              >
                <Trash2 size={14} />
              </button>

              <div className="p-4" style={{ padding: '0.75rem' }}>
                <h4 className="m-0 mb-2" style={{ fontSize: '0.9rem', 
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' 
                }}>{item.name}</h4>
                <div className="flex justify-between text-light" style={{ fontSize: '0.75rem' }}>
                  <span style={{ textTransform: 'capitalize' }}>{item.color}</span>
                  <span style={{ textTransform: 'capitalize' }}>{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <style>{`
        .animate-spin {
          animation: spin 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
