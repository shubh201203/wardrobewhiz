import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'lucide-react';
// import { Pose } from '@mediapipe/pose';

export default function AvatarFit() {
  const videoRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);

  useEffect(() => {
    // In a full implementation, you would bind `@mediapipe/pose` to this video stream here.
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreamActive(true);
      }
    } catch (err) {
      alert("Camera access denied or unavailable.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setStreamActive(false);
    }
  };

  return (
    <div className="flex-col animate-fade-in" style={{ height: 'calc(100vh - 120px)' }}>
      <div className="mb-4">
        <h2 className="m-0 flex items-center gap-2" style={{ fontSize: '1.5rem' }}>
          <span className="text-accent">3D</span> Avatar Fit
        </h2>
        <p className="text-light m-0">Powered by MediaPipe Pose Estimation</p>
      </div>

      <div className="card flex-1 flex-col items-center justify-center p-0" style={{ overflow: 'hidden', position: 'relative', backgroundColor: '#000' }}>
        
        {!streamActive ? (
          <div className="flex-col items-center justify-center" style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
            <Camera size={48} className="mb-4 text-accent" />
            <p className="mb-4">Activate camera to extract body landmarks and suggest fits.</p>
            <button className="btn btn-primary" onClick={startCamera}>Start Camera</button>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
            />
            {/* Overlay simulation */}
            <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', textAlign: 'center' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', padding: '0.5rem 1rem', borderRadius: '24px', fontSize: '0.85rem' }}>
                <span className="text-accent font-bold">●</span> Tracking 33 Body Landmarks...
              </div>
            </div>
            <button 
              className="btn btn-secondary" 
              onClick={stopCamera}
              style={{ position: 'absolute', top: '20px', right: '20px', padding: '0.5rem', borderRadius: '50%' }}
            >
              ✕
            </button>
          </>
        )}
      </div>

      <div className="mt-4 p-4 card" style={{ backgroundColor: 'var(--surface)' }}>
        <h3 className="m-0 mb-2 text-accent" style={{ fontSize: '1rem' }}>Fit Suggestions</h3>
        <p className="m-0 text-light" style={{ fontSize: '0.9rem' }}>
          {streamActive 
            ? "Body Type Detected: Athletic. Emphasize shoulders with tailored jackets. Consider tapering trousers." 
            : "Waiting for camera input..."}
        </p>
      </div>
    </div>
  );
}
