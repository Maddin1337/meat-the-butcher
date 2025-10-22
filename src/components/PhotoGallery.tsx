import { useEffect, useRef, useState } from 'react';
import ImageModal from './ImageModal';
import LazyImage from './LazyImage';
import { getStaticPhotoList, Photo } from '../utils/galleryUtils';

export default function PhotoGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  
  // Load photo list dynamically
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setIsLoading(true);
        // In einer Produktionsumgebung könnte hier getAvailablePhotos() verwendet werden
        // Für Performance verwenden wir die statische Liste
        const photoList = getStaticPhotoList();
        setPhotos(photoList);
      } catch (error) {
        console.error('Fehler beim Laden der Fotos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPhotos();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" className="py-20 px-4 bg-butcher-black-dark">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="font-bebas text-6xl md:text-7xl text-white mb-4 tracking-wider">
            GALERIE
          </h2>
          <div className="w-32 h-1 bg-butcher-red mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Einblicke in unsere BBQ-Events und kulinarischen Kreationen
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={`skeleton-${i}`}
                className="aspect-square bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(showAllImages ? photos : photos.slice(0, 16)).map((photo, index) => (
              <div
                key={photo.id}
                className={`relative overflow-hidden rounded-lg shadow-lg group transition-all duration-700 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => setSelectedImageIndex(photos.findIndex(p => p.id === photo.id))}
              >
                <div className="aspect-square w-full h-full overflow-hidden">
                  <LazyImage
                    src={photo.src}
                    alt={photo.alt}
                    thumbnail={photo.thumbnail}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onClick={() => setSelectedImageIndex(photos.findIndex(p => p.id === photo.id))}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-butcher-black-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {!showAllImages && photos.length > 16 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllImages(true)}
              className="bg-butcher-red hover:bg-butcher-red-light text-white font-bebas text-xl py-3 px-8 transition-all duration-300 transform hover:scale-105"
            >
              MEHR BILDER ANZEIGEN
            </button>
          </div>
        )}

        {selectedImageIndex !== null && (
          <ImageModal
            isOpen={true}
            imageSrc={photos[selectedImageIndex].src}
            imageAlt={photos[selectedImageIndex].alt}
            onClose={() => setSelectedImageIndex(null)}
            onNext={() => setSelectedImageIndex((prev) => prev !== null ? (prev + 1) % photos.length : null)}
            onPrevious={() => setSelectedImageIndex((prev) => prev !== null ? (prev - 1 + photos.length) % photos.length : null)}
            hasNext={selectedImageIndex < photos.length - 1}
            hasPrevious={selectedImageIndex > 0}
          />
        )}
      </div>
    </section>
  );
}