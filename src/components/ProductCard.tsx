import React from 'react';
import { Product, CartItem } from '../types';
import { formatPrice } from '../utils/format';
import { ImageWithFallback } from './ImageWithFallback';
import { Plus, Eye, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (cartItem: CartItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickAddToCart,
}) => {
  const defaultStorage = product.storageTiers[0];
  const defaultColor = product.colors[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const item: CartItem = {
      cartItemId: `${product.id}-${defaultStorage.size}-${defaultColor.name}-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      condition: product.condition,
      imageFileName: product.imageFileName,
      fallbackUrl: defaultColor.imageUrl,
      selectedColor: defaultColor,
      selectedStorage: defaultStorage,
      unitPriceFCFA: defaultStorage.priceFCFA,
      quantity: 1,
      gifts: product.gifts,
    };
    onQuickAddToCart(item);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative bg-[#111116] rounded-xl border border-[#22222b] hover:border-[#D4C7B0]/40 p-4 transition-all duration-300 cursor-pointer shadow-lg flex flex-col justify-between hover:shadow-xl hover:shadow-[#D4C7B0]/5"
    >
      {/* Top badges */}
      <div className="flex items-center justify-between gap-1 mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-[#1c1b18] border border-[#D4C7B0]/30 text-[#D4C7B0] flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>{product.badge}</span>
            </span>
          )}
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-[#181820] text-[#9ca3af] border border-[#272733]">
            {product.condition}
          </span>
        </div>

        {product.isPromo && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-red-950/70 border border-red-800/40 text-red-300">
            PROMO
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative w-full h-44 sm:h-48 flex items-center justify-center my-2 group-hover:scale-103 transition-transform duration-300">
        <ImageWithFallback
          imageFileName={product.imageFileName}
          fallbackUrl={defaultColor?.imageUrl}
          alt={product.name}
          className="h-full w-auto max-w-full object-contain drop-shadow-xl"
          category={product.category}
        />
      </div>

      {/* Product Info */}
      <div className="pt-2 border-t border-[#1e1e27] space-y-2">
        <div>
          <h4 className="text-sm font-bold text-white group-hover:text-[#D4C7B0] transition-colors line-clamp-1">
            {product.name}
          </h4>
          <p className="text-[11px] text-[#9ca3af] line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Color preview dots */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 pt-0.5">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-xs border border-[#3b3b4a]"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] text-[#9ca3af] ml-1">
              {product.colors.length} coloris
            </span>
          </div>
        )}

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-1">
          <div>
            {defaultStorage.oldPriceFCFA && (
              <span className="text-[10px] text-[#6b7280] line-through block font-mono">
                {formatPrice(defaultStorage.oldPriceFCFA)}
              </span>
            )}
            <span className="text-sm sm:text-base font-black text-[#D4C7B0] font-mono">
              {formatPrice(defaultStorage.priceFCFA)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectProduct(product)}
              className="p-2 rounded-md bg-[#1c1c24] hover:bg-[#252532] text-[#9ca3af] hover:text-white border border-[#2d2d3b] transition-all cursor-pointer"
              title="Voir la fiche détaillée"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleQuickAdd}
              className="px-2.5 py-1.5 rounded-md bg-[#D4C7B0] hover:bg-[#C5B79E] text-[#09090c] font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-md"
              title="Ajouter au panier"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Panier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
