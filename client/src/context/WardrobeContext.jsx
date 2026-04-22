import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { initialWardrobe, initialOutfits, mockInsights } from '../data/mockData';

const WardrobeContext = createContext();

const initialState = {
  items: [],
  outfits: initialOutfits,
  insights: mockInsights,
  isAnalyzing: false,
  isLoading: true,
  error: null
};

function wardrobeReducer(state, action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload, isLoading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'ADD_ITEM':
      return { ...state, items: [action.payload, ...state.items] };
    case 'SET_ANALYZING':
      return { ...state, isAnalyzing: action.payload };
    case 'ADD_OUTFIT':
      return { ...state, outfits: [action.payload, ...state.outfits] };
    default:
      return state;
  }
}

const BASE_URL = "https://wardrobewhiz.onrender.com"; // UPDATED FOR RENDER DEPLOYMENT

export function WardrobeProvider({ children }) {
  const [state, dispatch] = useReducer(wardrobeReducer, initialState);

  // Fetch from Firebase DB via backend on load
  useEffect(() => {
    const fetchWardrobe = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/wardrobe`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        dispatch({ type: 'SET_ITEMS', payload: (Array.isArray(data) && data.length > 0) ? data : initialWardrobe });
      } catch (err) {
        console.error("Failed to fetch wardrobe from DB", err);
        dispatch({ type: 'SET_ERROR', payload: "Unable to load wardrobe. Try again." });
      }
    };
    // To test locally change BASE_URL to http://localhost:5000 temporarily!
    fetchWardrobe();
  }, []);

  // Post to DB wrapper
  const addItemToDb = async (itemPayload) => {
    try {
      const dbPayload = { ...itemPayload };
      if (typeof dbPayload.image === 'string' && dbPayload.image.startsWith('blob:')) {
         dbPayload.image = '/images/tshirt.png'; 
      }

      const res = await fetch(`${BASE_URL}/api/wardrobe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dbPayload)
      });
      const savedItem = await res.json();
      
      // Send real database ID to local state
      dispatch({ type: 'ADD_ITEM', payload: savedItem });
    } catch (err) {
      console.error("Failed to save item to DB", err);
    }
  };

  const deleteItemFromDb = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/wardrobe/${id}`, { method: "DELETE" });
      dispatch({ type: 'SET_ITEMS', payload: state.items.filter(item => item.id !== id) });
    } catch (err) {
      console.error("Failed to delete item from DB", err);
    }
  };

  const analyzeWardrobe = async () => {
    dispatch({ type: 'SET_ANALYZING', payload: true });
    return new Promise(resolve => {
      setTimeout(() => {
        dispatch({ type: 'SET_ANALYZING', payload: false });
        resolve();
      }, 3000); 
    });
  };

  return (
    <WardrobeContext.Provider value={{ state, dispatch, analyzeWardrobe, addItemToDb, deleteItemFromDb }}>
      {children}
    </WardrobeContext.Provider>
  );
}

export function useWardrobe() {
  return useContext(WardrobeContext);
}
