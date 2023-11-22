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
    <div className={cn("relative", className)}>
        {/* Always render both images */}
        {/* Placeholder Image */}
        <div className="flex justify-center items-center absolute inset-0 z-10">
            <img
                src={placeholderSrc}
                alt={alt}
                className="object-cover w-1/2 transition-opacity duration-500 ease-in-out opacity-100"
            />
        </div>
        {/* Full Image */}
        <img
            src={fullSrc}
            alt={alt}
            onLoad={() => setImageLoaded(true)}
            className={cn("absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out", imageLoaded ? 'opacity-100 z-10' : 'opacity-0 z-0')}
            loading='lazy'
        />
    </div>
  );
};

export default ProgressiveImage;
