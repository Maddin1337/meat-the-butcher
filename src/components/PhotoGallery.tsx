import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ImageModal from './ImageModal';
import LazyImage from './LazyImage';
import { getStaticPhotoList, Photo } from '../utils/galleryUtils';
import { GALLERY_CONFIG, INTERSECTION_OBSERVER_CONFIG, ANIMATION_DELAYS, ERROR_MESSAGES } from '../constants';

function PhotoGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  
  // Memoize photo list loading
  const loadPhotos = useCallback(async () => {
    try {
      setIsLoading(true);
      // In einer Produktionsumgebung könnte hier getAvailablePhotos() verwendet werden
      // Für Performance verwenden wir die statische Liste
      const photoList = getStaticPhotoList();
      setPhotos(photoList);
    } catch (error) {
      console.error(ERROR_MESSAGES.PHOTOS_LOAD_FAILED, error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load photo list dynamically
  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: INTERSECTION_OBSERVER_CONFIG.THRESHOLD }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Memoize displayed photos
  const displayedPhotos = useMemo(() => 
    showAllImages ? photos : photos.slice(0, GALLERY_CONFIG.INITIAL_IMAGES_COUNT), 
    [showAllImages, photos]
  );

  // Handler for image click
  const handleImageClick = useCallback((photoId: number) => {
    setSelectedImageIndex(photos.findIndex(p => p.id === photoId));
  }, [photos]);

  // Handler for keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, photoId: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedImageIndex(photos.findIndex(p => p.id === photoId));
    }
  }, [photos]);

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
              Einblicke in unsere BBQ-Events und kulinarischen Kreationen - Catering Euskirchen
            </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: GALLERY_CONFIG.SKELETON_COUNT }, (_, i) => (
              <div
                key={`skeleton-${i}`}
                className="aspect-square bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedPhotos.map((photo, index) => (
              <button
                key={photo.id}
                className={`relative overflow-hidden rounded-lg shadow-lg group transition-all duration-700 cursor-pointer w-full h-full p-0 border-none bg-transparent ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * ANIMATION_DELAYS.GALLERY_IMAGE}ms` }}
                onClick={() => handleImageClick(photo.id)}
                onKeyDown={(e) => handleKeyDown(e, photo.id)}
                aria-label={`Bild ${index + 1} öffnen: ${photo.alt}`}
                tabIndex={0}
              >
                <div className="aspect-square w-full h-full overflow-hidden">
                  <LazyImage
                    src={photo.src}
                    alt={photo.alt}
                    thumbnail={photo.thumbnail}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-butcher-black-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}

        {!showAllImages && photos.length > GALLERY_CONFIG.INITIAL_IMAGES_COUNT && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllImages(true)}
              className="bg-butcher-red hover:bg-butcher-red-light text-white font-bebas text-xl py-3 px-8 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-butcher-black"
              aria-label="Alle Bilder anzeigen"
            >
              MEHR BILDER ANZEIGEN
            </button>
          </div>
        )}

        {selectedImageIndex !== null && photos[selectedImageIndex] && (
          <ImageModal
            isOpen={true}
            imageSrc={photos[selectedImageIndex]!.src}
            imageAlt={photos[selectedImageIndex]!.alt}
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

export default memo(PhotoGallery);