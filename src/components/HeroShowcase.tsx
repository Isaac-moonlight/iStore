import React from 'react';
import { Product } from '../types';
import { formatPrice } from '../utils/format';
import { ImageWithFallback } from './ImageWithFallback';
import { Sparkles, ArrowRight, Gift } from 'lucide-react';

interface HeroShowcaseProps {
  vedetteMax: Product;
  vedettePro: Product;
  onOpenConfigurator: (product: Product) => void;
}

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({
  vedetteMax,
  vedettePro,
  onOpenConfigurator,
}) => {
  return (
    <section className="py-6 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      {/* Featured Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4C7B0] animate-ping" />
          <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#D4C7B0] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4C7B0]" />
            Articles Vedettes du Moment
          </h2>
        </div>
        <span className="text-[11px] text-[#9ca3af] hidden sm:inline">
          Neufs Scellés · Pack Cadeaux Inclus
        </span>
      </div>

      {/* Grid of Vedettes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* iPhone 18 Pro Max */}
        <div 
          onClick={() => onOpenConfigurator(vedetteMax)}
          className="group relative bg-gradient-to-b from-[#131318] to-[#0d0d11] rounded-xl border border-[#262633] hover:border-[#D4C7B0]/50 p-5 sm:p-6 transition-all cursor-pointer shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-[#D4C7B0]/5"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4C7B0]/5 blur-3xl pointer-events-none group-hover:bg-[#D4C7B0]/10 transition-all" />

          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <span className="text-[10px] font-bold text-[#09090c] bg-[#D4C7B0] px-2.5 py-0.5 rounded-sm uppercase tracking-wider">
                Article Vedette #1
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5 tracking-tight group-hover:text-[#D4C7B0] transition-colors">
                {vedetteMax.name}
              </h3>
              <p className="text-xs text-[#9ca3af] mt-0.5 max-w-xs line-clamp-1">
                {vedetteMax.tagline}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#9ca3af] block">À partir de</span>
              <span className="text-base sm:text-lg font-black text-[#D4C7B0] font-mono">
                {formatPrice(vedetteMax.basePriceFCFA)}
              </span>
            </div>
          </div>

          {/* Visual Device */}
          <div className="relative h-48 sm:h-56 w-full flex items-center justify-center my-2 group-hover:scale-103 transition-transform duration-300">
            <ImageWithFallback
              imageFileName={vedetteMax.imageFileName}
              fallbackUrl="/products/iphone-18-pro-max.png"
              alt={vedetteMax.name}
              className="h-full w-auto object-contain drop-shadow-2xl"
              category={vedetteMax.category}
            />
          </div>

          {/* Gifts & CTA */}
          <div className="pt-3 border-t border-[#1f1f2a] flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-[#D4C7B0] text-[11px] font-medium">
              <Gift className="w-3.5 h-3.5 text-[#D4C7B0]" />
              <span>Chargeur 20W + Verre 9D + Coque offerts</span>
            </div>
            <div className="flex items-center gap-1 text-white font-bold group-hover:translate-x-1 transition-transform">
              <span className="text-xs">Détails</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4C7B0]" />
            </div>
          </div>
        </div>

        {/* iPhone 18 Pro */}
        <div 
          onClick={() => onOpenConfigurator(vedettePro)}
          className="group relative bg-gradient-to-b from-[#131318] to-[#0d0d11] rounded-xl border border-[#262633] hover:border-[#D4C7B0]/50 p-5 sm:p-6 transition-all cursor-pointer shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-[#D4C7B0]/5"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4C7B0]/5 blur-3xl pointer-events-none group-hover:bg-[#D4C7B0]/10 transition-all" />

          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <span className="text-[10px] font-bold text-[#09090c] bg-[#D4C7B0] px-2.5 py-0.5 rounded-sm uppercase tracking-wider">
                Article Vedette #2
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5 tracking-tight group-hover:text-[#D4C7B0] transition-colors">
                {vedettePro.name}
              </h3>
              <p className="text-xs text-[#9ca3af] mt-0.5 max-w-xs line-clamp-1">
                {vedettePro.tagline}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#9ca3af] block">À partir de</span>
              <span className="text-base sm:text-lg font-black text-[#D4C7B0] font-mono">
                {formatPrice(vedettePro.basePriceFCFA)}
              </span>
            </div>
          </div>

          {/* Visual Device */}
          <div className="relative h-48 sm:h-56 w-full flex items-center justify-center my-2 group-hover:scale-103 transition-transform duration-300">
            <ImageWithFallback
              imageFileName={vedettePro.imageFileName}
              fallbackUrl="/products/iphone-18-pro.png"
              alt={vedettePro.name}
              className="h-full w-auto object-contain drop-shadow-2xl"
              category={vedettePro.category}
            />
          </div>

          {/* Gifts & CTA */}
          <div className="pt-3 border-t border-[#1f1f2a] flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-[#D4C7B0] text-[11px] font-medium">
              <Gift className="w-3.5 h-3.5 text-[#D4C7B0]" />
              <span>Pack complet cadeaux inclus</span>
            </div>
            <div className="flex items-center gap-1 text-white font-bold group-hover:translate-x-1 transition-transform">
              <span className="text-xs">Détails</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4C7B0]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
