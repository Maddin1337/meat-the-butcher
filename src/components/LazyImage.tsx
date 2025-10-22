import { useEffect, useRef, useState } from 'react';
import { generateBlurPlaceholder } from '../utils/galleryUtils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  thumbnail?: string;
  onClick?: () => void;
}

export default function LazyImage({
  src,
  alt,
  className = '',
  thumbnail,
  onClick
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before image comes into view
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleThumbnailLoad = () => {
    setIsThumbnailLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* SVG Placeholder */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isThumbnailLoaded || isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <img
          src={generateBlurPlaceholder(400, 400)}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail (Progressive Loading) */}
      {isInView && thumbnail && !hasError && (
        <img
          src={thumbnail}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 filter blur-sm ${
            isThumbnailLoaded && !isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleThumbnailLoad}
          onError={() => {
            // Silently fail on thumbnail error, don't set hasError
            // This allows the main image to still load
          }}
        />
      )}

      {/* Actual Image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          } ${onClick ? 'cursor-pointer' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          onClick={onClick}
        />
      )}

      {/* Error State */}
      {hasError && (
        <div className="flex items-center justify-center w-full h-full bg-gray-800 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}