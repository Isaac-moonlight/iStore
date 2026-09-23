import React, { useState } from 'react';
import { Smartphone, Headphones, Zap, Volume2 } from 'lucide-react';
import { Category } from '../types';

interface ImageWithFallbackProps {
  src?: string;
  imageFileName?: string;
  fallbackUrl?: string;
  alt: string;
  className?: string;
  category?: Category;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  imageFileName,
  fallbackUrl,
  alt,
  className = 'w-full h-full object-contain',
  category = 'apple',
}) => {
  const initialSource = imageFileName ? `/products/${imageFileName}` : (src || fallbackUrl || '');
  const [currentSrc, setCurrentSrc] = useState<string>(initialSource);
  const [retryStage, setRetryStage] = useState<number>(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  const handleError = () => {
    if (retryStage === 0 && imageFileName) {
      const svgFallback = `/products/${imageFileName.replace(/\.(png|jpg|webp)$/i, '')}.svg`;
      setRetryStage(1);
      setCurrentSrc(svgFallback);
    } else if (retryStage <= 1 && (fallbackUrl || src)) {
      setRetryStage(2);
      setCurrentSrc(fallbackUrl || src || '');
    } else {
      setHasFailedAll(true);
    }
  };

  if (hasFailedAll || !currentSrc) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#131317] rounded-2xl p-4 text-center select-none border border-[#262630]">
        <div className="w-12 h-12 rounded-xl bg-[#1c1c24] border border-[#D4C7B0]/40 flex items-center justify-center text-[#D4C7B0] mb-2 shadow-lg">
          {(category === 'apple' || category === 'samsung' || category === 'pixel' || category === 'android') && (
            <Smartphone className="w-6 h-6" />
          )}
          {category === 'casques' && <Headphones className="w-6 h-6" />}
          {category === 'jbl' && <Volume2 className="w-6 h-6" />}
          {category === 'accessories' && <Zap className="w-6 h-6" />}
        </div>
        <span className="text-xs font-semibold text-white line-clamp-1">{alt}</span>
        <span className="text-[10px] text-[#D4C7B0] mt-0.5 tracking-wider font-bold">iStore 1010</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
    />
  );
};
