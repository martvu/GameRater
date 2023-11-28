import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface ProgressiveImageProps {
  placeholderSrc: string;
  fullSrc: string;
  alt: string;
  className?: string;
}

/**
 * ProgressiveImage component
 * @param {string} placeholderSrc - The placeholder image source
 * @param {string} fullSrc - The full (displayed) image source
 * @param {string} alt - The alt text for the image
 * @param {string} className - The class name for the image
 */
const ProgressiveImage = ({
  placeholderSrc,
  fullSrc,
  alt,
  className,
}: ProgressiveImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isCached, setIsCached] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = fullSrc;
    if (img.complete && img.naturalHeight !== 0) {
      // Image is cached
      setIsCached(true);
      setImageLoaded(true);
    } else {
      // Image is not cached, set up the onLoad listener
      img.onload = () => {
        setIsCached(false); // It's not cached if it's loading now.
        setImageLoaded(true);
      };
    }
  }, [fullSrc]);

  return (
    <div className={cn('relative', className)}>
      {/* Always render both images */}
      {/* Placeholder Image */}
      {!isCached && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <img
            src={placeholderSrc}
            alt="Fallback cover image"
            className="w-1/2 object-cover opacity-100 transition-opacity duration-500 ease-in-out"
          />
        </div>
      )}
      {/* Full Image */}
      <img
        src={fullSrc}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        className={cn(
          'absolute inset-0 h-full w-full object-cover',
          !isCached && 'transition-opacity duration-500 ease-in-out',
          imageLoaded ? 'z-10 opacity-100' : 'z-0 opacity-0'
        )}
        loading="lazy"
      />
    </div>
  );
};

export default ProgressiveImage;
