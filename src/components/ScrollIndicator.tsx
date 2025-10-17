import { useState, useEffect } from 'react';

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Throttling-Funktion für Performance-Optimierung
    let throttleTimeout: NodeJS.Timeout | null = null;
    
    const calculateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(scrollPercent, 100));
    };

    const handleScroll = () => {
      if (throttleTimeout === null) {
        throttleTimeout = setTimeout(() => {
          calculateScrollProgress();
          throttleTimeout = null;
        }, 16); // ~60fps
      }
    };

    // Initialen Fortschritt berechnen
    calculateScrollProgress();
    
    // Event Listener hinzufügen
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, []);

  return (
    <div className="scroll-indicator">
      <div 
        className="scroll-indicator-bar" 
        style={{ height: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollIndicator;