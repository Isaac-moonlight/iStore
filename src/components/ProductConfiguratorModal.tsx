import React, { useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { formatPrice, generateWhatsAppLink } from '../utils/format';
import { ImageWithFallback } from './ImageWithFallback';
import { 
  X, 
  Check, 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Gift, 
  Cpu, 
  BatteryCharging, 
  Camera, 
  Monitor 
} from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface ProductConfiguratorModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductConfiguratorModal: React.FC<ProductConfiguratorModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedStorage, setSelectedStorage] = useState(product.storageTiers[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  useEffect(() => {
    if (product) {
      setSelectedStorage(product.storageTiers[0]);
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    const item: CartItem = {
      cartItemId: `${product.id}-${selectedStorage.size}-${selectedColor.name}-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      condition: product.condition,
      imageFileName: product.imageFileName,
      fallbackUrl: selectedColor.imageUrl,
      selectedColor,
      selectedStorage,
      unitPriceFCFA: selectedStorage.priceFCFA,
      quantity: 1,
      gifts: product.gifts,
    };
    onAddToCart(item);
    onClose();
  };

  const whatsappMessage = `Bonjour iStore 1010, je souhaite commander :
- Produit : ${product.name}
- État : ${product.condition}
- Stockage / Version : ${selectedStorage.size}
- Couleur : ${selectedColor.name}
- Prix : ${formatPrice(selectedStorage.priceFCFA)}
- Pack cadeaux inclus : ${product.gifts.join(', ')}

Pouvez-vous confirmer la disponibilité immédiate et les modalités de livraison ?`;

  const whatsAppUrl = generateWhatsAppLink(STORE_INFO.whatsappNumber, whatsappMessage);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0d0d12] border border-[#272736] rounded-xl p-5 sm:p-7 text-[#f3f4f6] shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-start justify-between gap-4 border-b border-[#1f1f2c] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-[#1c1b18] border border-[#D4C7B0]/30 text-[#D4C7B0]">
                {product.condition}
              </span>
              {product.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-[#181822] text-[#9ca3af] border border-[#2d2d3c]">
                  {product.badge}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">{product.name}</h2>
            <p className="text-xs text-[#9ca3af] mt-0.5">{product.tagline}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#9ca3af] hover:text-white rounded-md hover:bg-[#1a1a24] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual & Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Visual Device */}
          <div className="h-56 sm:h-64 flex items-center justify-center bg-[#13131a] rounded-lg border border-[#21212c] p-4 relative">
            <ImageWithFallback
              imageFileName={product.imageFileName}
              fallbackUrl={selectedColor.imageUrl}
              alt={product.name}
              className="h-full w-auto max-w-full object-contain drop-shadow-2xl"
              category={product.category}
            />
            <div className="absolute bottom-2.5 left-3 text-[10px] text-[#D4C7B0] font-semibold bg-[#0d0d12]/80 px-2 py-0.5 rounded-sm border border-[#D4C7B0]/20">
              {selectedColor.name}
            </div>
          </div>

          {/* Configuration Selection */}
          <div className="space-y-4">
            {/* Color selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#D4C7B0] block uppercase tracking-wider">
                Couleur choisie : <span className="text-white font-semibold normal-case">{selectedColor.name}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => {
                  const isSelected = selectedColor.name === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-md border text-xs font-medium cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#D4C7B0] bg-[#1c1b18] text-white shadow-sm'
                          : 'border-[#262633] bg-[#121218] text-[#9ca3af] hover:border-[#3b3b4d]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-xs border border-white/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Storage / Version selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#D4C7B0] block uppercase tracking-wider">
                Capacité / Version :
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.storageTiers.map((tier) => {
                  const isSelected = selectedStorage.size === tier.size;
                  return (
                    <button
                      key={tier.size}
                      type="button"
                      onClick={() => setSelectedStorage(tier)}
                      className={`p-2.5 rounded-md border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#D4C7B0] bg-[#1c1b18] text-white shadow-sm'
                          : 'border-[#262633] bg-[#121218] text-[#9ca3af] hover:border-[#3b3b4d]'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{tier.size}</div>
                      <div className="text-xs font-mono text-[#D4C7B0] mt-0.5">
                        {formatPrice(tier.priceFCFA)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price display */}
            <div className="pt-2 border-t border-[#1f1f2c] flex items-baseline justify-between">
              <span className="text-xs text-[#9ca3af]">Prix total :</span>
              <span className="text-xl sm:text-2xl font-black text-[#D4C7B0] font-mono">
                {formatPrice(selectedStorage.priceFCFA)}
              </span>
            </div>
          </div>
        </div>

        {/* Technical Specs Accordion / Highlights */}
        <div className="bg-[#121218] rounded-lg border border-[#21212d] p-4 space-y-3 text-xs">
          <div className="font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#D4C7B0]" />
            <span>Fiche technique &amp; Contrôle qualité certifié</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#9ca3af]">
            {product.specs.screen && (
              <div className="flex items-center gap-2">
                <Monitor className="w-3.5 h-3.5 text-[#D4C7B0] shrink-0" />
                <span className="line-clamp-1">{product.specs.screen}</span>
              </div>
            )}
            {product.specs.chip && (
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#D4C7B0] shrink-0" />
                <span className="line-clamp-1">{product.specs.chip}</span>
              </div>
            )}
            {product.specs.battery && (
              <div className="flex items-center gap-2">
                <BatteryCharging className="w-3.5 h-3.5 text-[#D4C7B0] shrink-0" />
                <span className="line-clamp-1">{product.specs.battery}</span>
              </div>
            )}
            {product.specs.camera && (
              <div className="flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-[#D4C7B0] shrink-0" />
                <span className="line-clamp-1">{product.specs.camera}</span>
              </div>
            )}
          </div>

          {/* Highlights checklist */}
          <div className="pt-2 border-t border-[#1e1e29] flex flex-wrap gap-2">
            {product.specs.stateHighlights.map((hl, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[11px] text-white bg-[#181822] px-2 py-1 rounded-sm border border-[#2d2d3c]">
                <Check className="w-3 h-3 text-[#D4C7B0]" />
                {hl}
              </span>
            ))}
          </div>

          {/* Gifts Pack */}
          {product.gifts.length > 0 && (
            <div className="pt-2 border-t border-[#1e1e29] flex items-center gap-2 text-[11px] text-[#D4C7B0]">
              <Gift className="w-4 h-4 shrink-0" />
              <span>Pack offert : {product.gifts.join(' · ')}</span>
            </div>
          )}
        </div>

        {/* Buttons Action */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleAddToCart}
            className="w-full py-3.5 bg-[#1a1a24] hover:bg-[#232330] border border-[#363647] text-white text-xs font-bold rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4C7B0]" />
            <span>Ajouter au Panier</span>
          </button>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-[#D4C7B0] hover:bg-[#C5B79E] text-[#09090c] text-xs font-black rounded-md flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Commander sur WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
