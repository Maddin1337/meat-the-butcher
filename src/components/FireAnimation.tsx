import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  colorIndex: number;
  rotation: number;
  rotationSpeed: number;
  sway: number;
  swaySpeed: number;
  swayOffset: number;
  lifespan: number;
}

interface Color {
  r: number;
  g: number;
  b: number;
}

export default function FireAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Performance und Responsive Einstellungen
    // Initiale Größen in requestAnimationFrame lesen, um Forced Reflows zu vermeiden
    let isMobile = false;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Set canvas dimensions mit Performance-Optimierung
    const resizeCanvas = () => {
      // Verwende requestAnimationFrame, um Layout-Reads zu bündeln
      requestAnimationFrame(() => {
        isMobile = window.innerWidth < 768;
        const scale = isMobile ? 0.8 : 1; // Reduzierte Auflösung auf mobilen Geräten
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Alle Layout-Writes zusammen ausführen
        canvas.width = width * scale;
        canvas.height = height * scale;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
      });
    };
    
    // Initiale Größe setzen
    requestAnimationFrame(() => {
      isMobile = window.innerWidth < 768;
      const scale = isMobile ? 0.8 : 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    });
    
    window.addEventListener('resize', resizeCanvas);

    // BBQ-themed color palette - angepasst für Meat The Butcher
    const paletteBase = [
      { r: 196, g: 30, b: 58 },      // butcher-red (Hauptfarbe)
      { r: 255, g: 107, b: 53 },    // Grill-Orange
      { r: 255, g: 165, b: 0 },     // Gold/Glut
      { r: 255, g: 69, b: 0 },      // Feuer-Orange
      { r: 139, g: 0, b: 0 },       // Dunkelrot
      { r: 205, g: 92, b: 92 },     // Hellere rote Akzente
      { r: 255, g: 215, b: 0 }      // Helle Goldspitzen
    ];

    let palette = [...paletteBase];
    let time = 0;

    // Initialize particles
    const createParticles = () => {
      // Performance-optimierte Partikelanzahl basierend auf Bildschirmgröße
      // Verwende canvas.width/height statt window.innerWidth, um Forced Reflows zu vermeiden
      const particleCount = Math.min(
        Math.floor(canvas.width * canvas.height / 5000),
        100 // Maximale Partikel für Performance
      );
      
      for (let i = 0; i < particleCount; i++) {
        // Mehr Partikel von unten für realistischeren Feuer-Effekt
        const isBottomParticle = Math.random() > 0.3;
        
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: isBottomParticle
            ? canvas.height + Math.random() * 50
            : canvas.height * 0.7 + Math.random() * canvas.height * 0.3,
          size: isBottomParticle
            ? 2 + Math.random() * 8  // Kleinere Partikel unten
            : 4 + Math.random() * 12, // Größere Partikel in der Mitte
          opacity: 0.1 + Math.random() * 0.25,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: isBottomParticle
            ? -0.8 - Math.random() * 1.5
            : -1.2 - Math.random() * 1.8,
          colorIndex: Math.floor(Math.random() * palette.length),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.015,
          sway: 0.15 + Math.random() * 0.25,
          swaySpeed: 0.003 + Math.random() * 0.008,
          swayOffset: Math.random() * Math.PI * 2,
          lifespan: 80 + Math.random() * 150
        });
      }
    };

    createParticles();

    // Update color palette mit BBQ-optimierten Farbschwankungen
    const updatePalette = () => {
      palette = paletteBase.map((color, index) => {
        const t = time + index * 0.3;
        // Reduzierte Variation für subtileren, professionelleren Effekt
        const variation = index === 0 ? 8 : 12; // Weniger Variation bei der Hauptfarbe
        
        return {
          r: Math.min(255, Math.max(0, color.r + Math.sin(t) * variation)),
          g: Math.min(255, Math.max(0, color.g + Math.sin(t + 1) * variation * 0.8)),
          b: Math.min(255, Math.max(0, color.b + Math.sin(t + 2) * variation * 0.6))
        };
      });
    };

    // Draw flame particle mit BBQ-optimierter Form
    const drawBrushstroke = (x: number, y: number, size: number, rotation: number, color: Color, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Create gradient mit BBQ-Farbverlauf
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.8})`);
      gradient.addColorStop(0.4, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.5})`);
      gradient.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.2})`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      
      ctx.fillStyle = gradient;
      
      // Optimierte Flammenform für BBQ-Theme
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(
        size * 0.5, -size * 0.8,
        size * 0.8, -size * 0.3,
        size * 0.6, 0
      );
      ctx.bezierCurveTo(
        size * 0.4, size * 0.4,
        size * 0.1, size * 0.7,
        0, size
      );
      ctx.bezierCurveTo(
        -size * 0.1, size * 0.7,
        -size * 0.4, size * 0.4,
        -size * 0.6, 0
      );
      ctx.bezierCurveTo(
        -size * 0.8, -size * 0.3,
        -size * 0.5, -size * 0.8,
        0, -size
      );
      ctx.closePath();
      ctx.fill();
      
      // Add subtle glow effect
      ctx.shadowBlur = size * 0.5;
      ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.3})`;
      ctx.fill();
      
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      time += 0.01;
      
      // Update colors
      updatePalette();
      
      // Update and draw particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        
        // Apply movement
        p.x += p.speedX + Math.sin(time * p.swaySpeed + p.swayOffset) * p.sway;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.lifespan -= 1;
        
        // Calculate life factor
        const lifeFactor = p.lifespan / 300;
        const currentSize = p.size * lifeFactor;
        const currentOpacity = p.opacity * lifeFactor;
        
        // Draw particle
        if (p.lifespan > 0) {
          drawBrushstroke(
            p.x, 
            p.y, 
            currentSize, 
            p.rotation, 
            palette[p.colorIndex], 
            currentOpacity
          );
        }
        
        // Reset particle if faded out
        if (p.lifespan <= 0 || p.y < -100) {
          particlesRef.current[i] = {
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 50,
            size: 3 + Math.random() * 15,
            opacity: 0.1 + Math.random() * 0.3,
            speedX: (Math.random() - 0.5) * 1,
            speedY: -1 - Math.random() * 2,
            colorIndex: Math.floor(Math.random() * palette.length),
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            sway: 0.2 + Math.random() * 0.3,
            swaySpeed: 0.005 + Math.random() * 0.01,
            swayOffset: Math.random() * Math.PI * 2,
            lifespan: 100 + Math.random() * 200
          };
        }
      }
      
      // Add new particles if needed (mit Limit für Performance)
      if (particlesRef.current.length < 60) {
        createParticles();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
}