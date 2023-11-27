import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

interface ProgressiveImageProps {
  placeholderSrc: string;
  fullSrc: string;
  alt: string;
  className?: string;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  placeholderSrc,
  fullSrc,
  alt,
  className,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = fullSrc;
    img.onload = () => setImageLoaded(true);
  }, [fullSrc]);

  return (
    <div className={cn('relative', className)}>
      {/* Always render both images */}
      {/* Placeholder Image */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <img
          src={placeholderSrc}
          alt="Fallback cover image"
          className="w-1/2 object-cover opacity-100 transition-opacity duration-500 ease-in-out"
        />
      </div>
      {/* Full Image */}
      <img
        src={fullSrc}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out',
          imageLoaded ? 'z-10 opacity-100' : 'z-0 opacity-0'
        )}
        loading="lazy"
      />
    </div>
  );
};

export default ProgressiveImage;
