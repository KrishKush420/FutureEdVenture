import React, { useEffect, useRef, useState } from 'react';
import { SceneManager } from '@/lib/three/SceneManager';

interface SchoolSceneAnimationProps {
  className?: string;
}

export const SchoolSceneAnimation: React.FC<SchoolSceneAnimationProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneManagerRef = useRef<SceneManager | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      // Check for WebGL support first
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      
      if (!gl) {
        console.warn('WebGL not supported, falling back to CSS background');
        setWebglSupported(false);
        return;
      }

      // Initialize Three.js scene
      const sceneManager = new SceneManager(canvasRef.current);
      sceneManagerRef.current = sceneManager;

      // Start animation loop
      const animate = () => {
        try {
          sceneManager.update();
          sceneManager.render();
          animationIdRef.current = requestAnimationFrame(animate);
        } catch (err) {
          console.error('Animation error:', err);
          setError('Animation stopped due to error');
          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
          }
        }
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        try {
          sceneManager.handleResize();
        } catch (err) {
          console.error('Resize error:', err);
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        window.removeEventListener('resize', handleResize);
        try {
          sceneManager.dispose();
        } catch (err) {
          console.error('Disposal error:', err);
        }
      };
    } catch (err) {
      console.error('Three.js initialization error:', err);
      setWebglSupported(false);
      setError('WebGL initialization failed');
    }
  }, []);

  // Beautiful 2D educational scene when WebGL is not supported
  if (!webglSupported || error) {
    return (
      <div
        className={`absolute inset-0 w-full h-full ${className}`}
        style={{ 
          background: 'linear-gradient(to bottom, #87CEEB 0%, #98D8E8 30%, #B8E6F0 60%, #E8F4F8 100%)',
          pointerEvents: 'none'
        }}
      >
        {/* 2D Educational Scene - Constrained to top half only */}
        <div className="absolute inset-0" style={{ height: '50vh' }}>
          
          {/* Sky Elements */}
          {/* Sun */}
          <div className="absolute top-12 right-16 w-16 h-16 bg-yellow-400 rounded-full shadow-lg animate-pulse">
            {/* Sun rays */}
            <div className="absolute inset-0">
              <div className="absolute top-[-8px] left-1/2 w-0.5 h-6 bg-yellow-300 transform -translate-x-1/2"></div>
              <div className="absolute bottom-[-8px] left-1/2 w-0.5 h-6 bg-yellow-300 transform -translate-x-1/2"></div>
              <div className="absolute left-[-8px] top-1/2 w-6 h-0.5 bg-yellow-300 transform -translate-y-1/2"></div>
              <div className="absolute right-[-8px] top-1/2 w-6 h-0.5 bg-yellow-300 transform -translate-y-1/2"></div>
            </div>
          </div>
          
          {/* Clouds with proper positioning */}
          <div className="absolute top-8 left-12 w-12 h-6 bg-white rounded-full opacity-90 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-6 left-16 w-8 h-4 bg-white rounded-full opacity-80" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-16 right-32 w-14 h-7 bg-white rounded-full opacity-85 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-12 right-36 w-10 h-5 bg-white rounded-full opacity-75" style={{animationDelay: '1.2s'}}></div>
          
          {/* Flying birds */}
          <div className="absolute top-20 left-1/3 w-1 h-1 bg-gray-600 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-18 left-1/3 w-1 h-1 bg-gray-600 rounded-full animate-ping" style={{animationDelay: '2.2s', marginLeft: '8px'}}></div>
          <div className="absolute top-24 right-1/3 w-1 h-1 bg-gray-600 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
          
          {/* Ground/Horizon Line */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-green-200 to-transparent"></div>
          
          {/* School Building - Beautiful 2D representation */}
          <div className="absolute bottom-4 left-1/4 w-40 h-16">
            {/* Main building structure */}
            <div className="absolute bottom-0 left-0 w-32 h-12 bg-red-100 border-2 border-red-200 rounded-t-lg shadow-md">
              {/* Roof */}
              <div className="absolute -top-3 left-0 w-full h-6 bg-red-400 rounded-t-lg border-l-2 border-r-2 border-t-2 border-red-500"></div>
              
              {/* Windows */}
              <div className="absolute top-1 left-2 w-4 h-3 bg-blue-200 border border-blue-300 rounded-sm"></div>
              <div className="absolute top-1 left-8 w-4 h-3 bg-blue-200 border border-blue-300 rounded-sm"></div>
              <div className="absolute top-1 left-14 w-4 h-3 bg-blue-200 border border-blue-300 rounded-sm"></div>
              <div className="absolute top-1 left-20 w-4 h-3 bg-blue-200 border border-blue-300 rounded-sm"></div>
              
              {/* Door */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-amber-600 border-l border-r border-amber-700 rounded-t-lg"></div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-x-1 w-1 h-1 bg-yellow-400 rounded-full"></div>
            </div>
            
            {/* School sign */}
            <div className="absolute -top-2 left-6 w-16 h-3 bg-white border border-gray-300 rounded text-xs flex items-center justify-center">
              <span className="text-gray-700 text-[8px] font-semibold">SCHOOL</span>
            </div>
            
            {/* Flag pole */}
            <div className="absolute bottom-0 right-2 w-0.5 h-14 bg-gray-400"></div>
            <div className="absolute top-0 right-1 w-4 h-2 bg-red-500 border border-red-600"></div>
          </div>
          
          {/* Beautiful Tree - 2D representation */}
          <div className="absolute bottom-4 left-8 w-12 h-16">
            {/* Tree trunk */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-amber-800 border-l border-r border-amber-900"></div>
            
            {/* Tree foliage - layered for depth */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-10 h-8 bg-green-500 rounded-full border-2 border-green-600 shadow-md"></div>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-x-1 w-8 h-6 bg-green-400 rounded-full opacity-90"></div>
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 -translate-x-1 w-6 h-5 bg-green-600 rounded-full opacity-80"></div>
            
            {/* Tree details */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 translate-x-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
            <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 -translate-x-1 w-1 h-1 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: '3.5s'}}></div>
          </div>
          
          {/* Playground elements */}
          <div className="absolute bottom-2 right-16 w-8 h-6">
            {/* Swing set */}
            <div className="absolute bottom-0 left-0 w-0.5 h-4 bg-gray-500"></div>
            <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-gray-500"></div>
            <div className="absolute top-1 left-0 w-full h-0.5 bg-gray-500"></div>
            {/* Swing */}
            <div className="absolute bottom-2 left-2 w-3 h-0.5 bg-red-400 animate-pulse"></div>
          </div>
          
        </div>
        
        {error && (
          <div className="absolute top-2 left-2 text-xs text-gray-600 opacity-50 bg-white/50 px-2 py-1 rounded">
            2D Educational Scene
          </div>
        )}
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full ${className}`}
      style={{ 
        height: '50vh', // Only occupy top half
        background: 'linear-gradient(to bottom, #87CEEB 0%, #98D8E8 30%, #B8E6F0 60%, #E8F4F8 100%)',
        pointerEvents: 'none'
      }}
    />
  );
};