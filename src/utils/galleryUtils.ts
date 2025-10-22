// Hilfsfunktionen für die Galerie

export interface Photo {
  id: number;
  src: string;
  alt: string;
  thumbnail?: string;
}

// Import der Bildliste aus der Konfigurationsdatei
import imageIds from '../config/gallery-images.json';

// Funktion zur dynamischen Erkennung der verfügbaren Bilder
export async function getAvailablePhotos(): Promise<Photo[]> {
  try {
    const photos: Photo[] = [];
    
    // Überprüfen, welche Bilder tatsächlich existieren
    for (const id of imageIds) {
      const imagePath = `/gallery/image-${id}.webp`;
      const thumbnailPath = `/gallery/thumbnails/image-${id}.webp`;
      
      try {
        // Überprüfen, ob das Bild existiert
        const response = await fetch(imagePath, { method: 'HEAD' });
        if (response.ok) {
          photos.push({
            id,
            src: imagePath,
            alt: `Meat the Butcher Gallery Bild ${id}`,
            thumbnail: thumbnailPath
          });
        }
      } catch {
        // Bild existiert nicht, überspringen
        continue;
      }
    }
    
    return photos;
  } catch (error) {
    console.error('Fehler beim Laden der Galerie-Bilder:', error);
    // Fallback auf eine Standardliste mit bekannten Bildern
    return getStaticPhotoList();
  }
}

// Methode: Import der Bild-Manifeste zur Build-Zeit
// Dies ist performanter als die Runtime-Überprüfung
export function getStaticPhotoList(): Photo[] {
  return imageIds.map(id => ({
    id,
    src: `/gallery/image-${id}.webp`,
    alt: `Meat the Butcher Gallery Bild ${id}`,
    thumbnail: `/gallery/thumbnails/image-${id}.webp`
  }));
}

// Funktion zum Erstellen von Lazy Loading Refs
export function createLazyImageObserver(callback: (entries: IntersectionObserverEntry[]) => void) {
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '50px', // Bilder 50px vor dem Erscheinen laden
    threshold: 0.01
  });
}

// Funktion zur Generierung von Blur-Placeholdern
export function generateBlurPlaceholder(width: number, height: number): string {
  // Generiert ein kleines, unscharfes SVG als Platzhalter
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#374151"/>
      <rect width="100%" height="100%" fill="url(#gradient)"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4B5563;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#374151;stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}