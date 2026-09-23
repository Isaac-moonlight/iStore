import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroShowcase } from './components/HeroShowcase';
import { ProductCard } from './components/ProductCard';
import { ProductConfiguratorModal } from './components/ProductConfiguratorModal';
import { TradeInSimulator } from './components/TradeInSimulator';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { PRODUCTS, STORE_INFO } from './data/products';
import { Product, Category, CartItem } from './types';
import { 
  Search, 
  MessageCircle, 
  ArrowUpDown,
  X,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import { generateWhatsAppLink } from './utils/format';

type SortOption = 'default' | 'price-asc' | 'price-desc';

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<Category>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSwapOpen, setIsSwapOpen] = useState(false);
  const [configuratorProduct, setConfiguratorProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // Featured Vedette Products (iPhone 18 Pro Max & iPhone 18 Pro)
  const vedetteMax = PRODUCTS[0];
  const vedettePro = PRODUCTS[1];

  // Filtered and Sorted Catalogue
  const displayedProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (currentCategory !== 'all') {
        if (product.category !== currentCategory) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesTag = product.tagline.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCond = product.condition.toLowerCase().includes(q);
        if (!matchesName && !matchesTag && !matchesBrand && !matchesCond) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePriceFCFA - b.basePriceFCFA;
      if (sortBy === 'price-desc') return b.basePriceFCFA - a.basePriceFCFA;
      return 0;
    });
  }, [currentCategory, searchQuery, sortBy]);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === newItem.productId && 
               i.selectedColor.name === newItem.selectedColor.name &&
               i.selectedStorage.size === newItem.selectedStorage.size
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i))
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const floatingWhatsAppUrl = generateWhatsAppLink(
    STORE_INFO.whatsappNumber,
    "Bonjour iStore 1010, je souhaite commander un article disponible sur votre boutique en ligne. Avez-vous des disponibilités aujourd'hui ?"
  );

  return (
    <div className="min-h-screen bg-[#070709] text-[#f4f4f6] flex flex-col selection:bg-[#D4C7B0] selection:text-[#09090c] antialiased font-sans">
      {/* 1. Header Navigation avec logos / icônes */}
      <Navbar
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          const el = document.getElementById('catalogue');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 2. Vitrine Vedettes : iPhone 18 Pro Max & iPhone 18 Pro */}
      <HeroShowcase
        vedetteMax={vedetteMax}
        vedettePro={vedettePro}
        onOpenConfigurator={(p) => setConfiguratorProduct(p)}
      />

      {/* 3. Catalogue des Articles (iPhones, Samsung, Pixel, Androids, Casques, JBL, Accessoires) */}
      <main id="catalogue" className="py-8 px-4 sm:px-6 max-w-6xl mx-auto w-full flex-1 space-y-6">
        {/* Top Control Bar: Search + Count + Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-[#1c1c24] pb-4">
          <div className="text-xs text-[#9ca3af] self-start sm:self-auto flex items-center gap-2">
            <span className="font-extrabold text-[#D4C7B0] bg-[#1c1b18] px-2.5 py-1 rounded-md text-xs border border-[#D4C7B0]/30">
              {displayedProducts.length} articles disponibles
            </span>
            <span className="hidden md:inline text-[#6b7280]">
              · Prix en FCFA · Neufs scellés &amp; Occasions 10/10 USA
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#D4C7B0] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher modèle, casque..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121217] border border-[#272733] text-white placeholder-[#6b7280] rounded-md pl-8 pr-7 py-2 text-xs outline-none focus:border-[#D4C7B0] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-white p-0.5 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 bg-[#121217] border border-[#272733] rounded-md px-2.5 py-1.5 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#D4C7B0]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-xs text-white font-medium outline-none cursor-pointer"
              >
                <option value="default" className="bg-[#121218]">Tri par défaut</option>
                <option value="price-asc" className="bg-[#121218]">Prix croissant</option>
                <option value="price-desc" className="bg-[#121218]">Prix décroissant</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {displayedProducts.length === 0 ? (
          <div className="py-16 text-center text-[#9ca3af] space-y-3 bg-[#111116] rounded-xl border border-[#22222d] p-8">
            <p className="text-sm font-bold text-white">Aucun produit trouvé pour votre recherche</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCurrentCategory('all');
              }}
              className="text-xs font-bold text-[#D4C7B0] hover:underline cursor-pointer bg-[#1c1b18] px-4 py-2 rounded-md border border-[#D4C7B0]/30"
            >
              Afficher tout le catalogue iStore 1010
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(p) => setConfiguratorProduct(p)}
                onQuickAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {/* Troc / Swap Link */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => setIsSwapOpen(true)}
            className="text-xs font-bold text-[#D4C7B0] hover:text-white bg-[#121217] hover:bg-[#1c1c24] border border-[#2e2e3d] rounded-md px-5 py-3 flex items-center gap-2 transition-all cursor-pointer shadow-md hover:border-[#D4C7B0]/40"
          >
            <RefreshCw className="w-4 h-4 text-[#D4C7B0]" />
            <span>Faire un Troc / Échange de votre ancien appareil</span>
          </button>
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* Floating Action Buttons: Cart and WhatsApp */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 p-3 bg-[#14141c] text-white rounded-md shadow-2xl hover:scale-105 transition-transform cursor-pointer border border-[#D4C7B0]"
            title="Voir mon panier"
          >
            <ShoppingBag className="w-5 h-5 text-[#D4C7B0]" />
            <span className="text-xs font-bold pr-1">{totalCartCount}</span>
          </button>
        )}

        <a
          href={floatingWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 bg-[#D4C7B0] hover:bg-[#C5B79E] text-[#09090c] rounded-md shadow-2xl transition-transform hover:scale-105 cursor-pointer border border-[#C5B79E]"
          title="WhatsApp Direct iStore 1010"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
        </a>
      </div>

      {/* 5. Fenêtre pop-up de détail pour chaque article */}
      <ProductConfiguratorModal
        product={configuratorProduct}
        onClose={() => setConfiguratorProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 6. Simulateur de Troc / Échange */}
      <TradeInSimulator
        isOpen={isSwapOpen}
        onClose={() => setIsSwapOpen(false)}
      />

      {/* 7. Panier d'achat coulissant */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
