import { useState, useEffect } from 'react';

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Verwende requestAnimationFrame für bessere Performance und um Forced Reflows zu vermeiden
    let rafId: number | null = null;
    
    const calculateScrollProgress = () => {
      // Alle Layout-Reads zusammen in requestAnimationFrame ausführen
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(scrollPercent, 100));
    };

    const handleScroll = () => {
      // Verwende requestAnimationFrame statt setTimeout für bessere Performance
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          calculateScrollProgress();
          rafId = null;
        });
      }
    };

    // Initialen Fortschritt in requestAnimationFrame berechnen
    rafId = requestAnimationFrame(() => {
      calculateScrollProgress();
      rafId = null;
    });
    
    // Event Listener hinzufügen
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
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