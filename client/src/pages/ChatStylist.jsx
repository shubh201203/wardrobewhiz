import React, { useState, useRef, useEffect } from 'react';
import { useWardrobe } from '../context/WardrobeContext';
import { Send } from 'lucide-react';

export default function ChatStylist() {
  const { state } = useWardrobe();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hi! I'm your AI Stylist powered by OpenAI. What are we dressing for today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      // Pinging the Node.js backend which proxies to OpenAI
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMsg,
          wardrobeContext: state.items
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', text: "⚠️ Error from Stylist Server: " + (data.error || "Unknown Error") }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', text: "⚠️ Could not connect to the Backend server on port 5000. Is it running?" }]);
    }
    
    setIsTyping(false);
  };

  return (
    <div className="flex-col animate-fade-in" style={{ height: 'calc(100vh - 160px)' }}>
      <div className="mb-4">
        <h2 className="m-0" style={{ fontSize: '1.5rem' }}>AI Stylist Chat</h2>
        <p className="text-light m-0">Powered by OpenAI Express Engine</p>
      </div>

      <div className="flex-col gap-4 flex-1" style={{ overflowY: 'auto', paddingBottom: '1rem' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: msg.sender === 'user' ? 'var(--text)' : 'var(--surface)',
            color: msg.sender === 'user' ? 'var(--primary)' : 'var(--text)',
            padding: '0.75rem 1rem',
            borderRadius: '16px',
            borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
            borderBottomLeftRadius: msg.sender === 'ai' ? '4px' : '16px',
            maxWidth: '80%',
            border: msg.sender === 'ai' ? '1px solid var(--border)' : 'none',
            fontSize: '0.9rem',
            lineHeight: 1.4
          }}>
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', fontStyle: 'italic', color: 'var(--text-light)', fontSize: '0.8rem' }}>
            OpenAI is resolving your query...
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="flex gap-2" style={{ padding: '0.5rem 0' }}>
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask for outfit advice..."
          style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '24px', border: '1px solid var(--border)', fontFamily: 'var(--font-primary)' }}
        />
        <button 
          onClick={handleSend}
          disabled={isTyping}
          style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: isTyping ? 'var(--border)' : 'var(--accent)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
