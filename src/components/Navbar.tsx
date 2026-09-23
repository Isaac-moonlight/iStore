import React from 'react';
import { 
  ShoppingBag, 
  Smartphone, 
  Headphones, 
  Volume2, 
  Zap, 
  LayoutGrid,
} from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  currentCategory: Category;
  onSelectCategory: (category: Category) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
}) => {
  const categoryTabs: { id: Category; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Tout', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'apple', label: 'iPhones', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'casques', label: 'Casques', icon: <Headphones className="w-4 h-4" /> },
    { id: 'samsung', label: 'Samsung', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'pixel', label: 'Pixel', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'android', label: 'Androids', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'jbl', label: 'JBL', icon: <Volume2 className="w-4 h-4" /> },
    { id: 'accessories', label: 'Accessoires', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#09090c]/90 backdrop-blur-md border-b border-[#1f1f27] px-3 sm:px-6 py-2.5 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo iStore 1010 */}
        <button
          onClick={() => onSelectCategory('all')}
          className="flex items-center gap-2.5 group cursor-pointer text-left shrink-0"
        >
          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-[#1b1b22] to-[#0c0c0f] border border-[#3b3b4a] group-hover:border-[#D4C7B0] flex items-center justify-center font-black text-xs text-white shadow-lg transition-all">
            <span className="text-white">10</span>
            <span className="text-[#D4C7B0]">10</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-[#D4C7B0] transition-colors">
                iStore 1010
              </span>
            </div>
            <p className="text-[10px] text-[#9ca3af] -mt-0.5 hidden sm:block">
              iPhones · Androids · Casques · JBL
            </p>
          </div>
        </button>

        {/* Category Tabs (Minimaliste carré avec logos) */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1 px-1 max-w-[65vw] sm:max-w-none">
          {categoryTabs.map((tab) => {
            const isActive = currentCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1c1b18] text-[#D4C7B0] border border-[#D4C7B0]/40 shadow-sm'
                    : 'text-[#9ca3af] hover:text-white hover:bg-[#141418] border border-transparent'
                }`}
                title={tab.label}
              >
                <span className={isActive ? 'text-[#D4C7B0]' : 'text-[#858598]'}>
                  {tab.icon}
                </span>
                <span className="text-[11px] sm:text-xs">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Cart Trigger */}
        <button
          onClick={onOpenCart}
          className="relative p-2 rounded-md bg-[#141419] border border-[#272733] hover:border-[#D4C7B0]/50 text-white hover:text-[#D4C7B0] transition-all cursor-pointer shrink-0 shadow-sm"
          aria-label="Ouvrir le panier"
        >
          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-sm bg-[#D4C7B0] text-[#09090c] text-[10px] font-black flex items-center justify-center shadow-md animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
