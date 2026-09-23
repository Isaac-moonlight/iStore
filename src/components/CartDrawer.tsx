import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatPrice, generateWhatsAppLink } from '../utils/format';
import { ImageWithFallback } from './ImageWithFallback';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  ShoppingBag,
  ArrowRight,
  Truck,
  Building2,
  Gift
} from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(STORE_INFO.paymentMethods[0]);

  const subtotalFCFA = items.reduce((acc, item) => acc + item.unitPriceFCFA * item.quantity, 0);
  const deliveryFeeFCFA = deliveryMode === 'delivery' && items.length > 0 ? 2000 : 0;
  const totalFCFA = subtotalFCFA + deliveryFeeFCFA;

  const orderWhatsAppMessage = `Bonjour iStore 1010, je souhaite valider mon panier :

${items
  .map(
    (item, idx) =>
      `${idx + 1}. *${item.productName}* (${item.condition})
   - Capacité / Version : ${item.selectedStorage.size}
   - Couleur : ${item.selectedColor.name}
   - Quantité : ${item.quantity} x ${formatPrice(item.unitPriceFCFA)} = ${formatPrice(
        item.unitPriceFCFA * item.quantity
      )}`
  )
  .join('\n\n')}

----------------------------------
*Sous-total :* ${formatPrice(subtotalFCFA)}
*Mode :* ${deliveryMode === 'delivery' ? 'Livraison à domicile' : 'Retrait direct en boutique'} ${
    deliveryFeeFCFA > 0 ? `(${formatPrice(deliveryFeeFCFA)})` : ''
  }
*TOTAL À RÉGLER :* ${formatPrice(totalFCFA)}
*Moyen de règlement souhaité :* ${selectedPayment}

*Informations client :*
- Nom : ${customerName || 'Non précisé'}
- Téléphone : ${customerPhone || 'À préciser sur WhatsApp'}
- Ville / Quartier : ${customerCity || 'Cotonou / Bénin'}

Merci de me confirmer la disponibilité et le créneau de livraison !`;

  const orderWhatsAppUrl = generateWhatsAppLink(STORE_INFO.whatsappNumber, orderWhatsAppMessage);

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md h-full bg-[#0b0b0f] border-l border-[#22222d] p-5 flex flex-col justify-between overflow-y-auto text-[#f3f4f6] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between border-b border-[#1d1d27] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4C7B0]" />
              <h3 className="font-extrabold text-base text-white">Votre Panier d'Achat</h3>
              <span className="text-xs bg-[#1c1b18] text-[#D4C7B0] px-2 py-0.5 rounded-sm border border-[#D4C7B0]/30 font-bold">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#9ca3af] hover:text-white rounded-md hover:bg-[#181822] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List */}
          {items.length === 0 ? (
            <div className="py-16 text-center text-[#9ca3af] space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#3b3b4a] mx-auto stroke-1" />
              <p className="text-sm font-semibold text-white">Votre panier est vide</p>
              <p className="text-xs text-[#828292]">
                Explorez le catalogue et sélectionnez vos smartphones, casques audio et accessoires.
              </p>
              <button
                onClick={onClose}
                className="mt-2 text-xs font-bold text-[#D4C7B0] hover:underline cursor-pointer"
              >
                Parcourir les nouveautés
              </button>
            </div>
          ) : (
            <div className="space-y-3 max-h-[42vh] overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 bg-[#121218] border border-[#21212c] rounded-lg flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="w-14 h-14 bg-[#181820] rounded-md p-1.5 border border-[#2d2d3c] shrink-0 flex items-center justify-center">
                    <ImageWithFallback
                      imageFileName={item.imageFileName}
                      fallbackUrl={item.fallbackUrl}
                      alt={item.productName}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {item.productName}
                    </h4>
                    <p className="text-[11px] text-[#9ca3af] truncate">
                      {item.selectedStorage.size} · {item.selectedColor.name}
                    </p>
                    <div className="text-xs font-mono font-black text-[#D4C7B0] mt-0.5">
                      {formatPrice(item.unitPriceFCFA)}
                    </div>
                  </div>

                  {/* Quantity and delete */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <div className="flex items-center gap-1 bg-[#191922] border border-[#2c2c3b] rounded-md p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1 text-[#9ca3af] hover:text-white cursor-pointer"
                        title="Diminuer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold px-1 text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 text-[#9ca3af] hover:text-white cursor-pointer"
                        title="Augmenter"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="text-[#ef4444] hover:text-red-400 p-0.5 cursor-pointer text-[10px] flex items-center gap-0.5"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-1">
                <button
                  onClick={onClearCart}
                  className="text-[11px] text-[#ef4444] hover:underline cursor-pointer"
                >
                  Vider le panier
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Details & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-[#1d1d27] pt-3 space-y-3">
            {/* Delivery choice */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDeliveryMode('delivery')}
                className={`p-2 rounded-md border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  deliveryMode === 'delivery'
                    ? 'border-[#D4C7B0] bg-[#1c1b18] text-white'
                    : 'border-[#232330] bg-[#121217] text-[#9ca3af]'
                }`}
              >
                <Truck className="w-3.5 h-3.5 text-[#D4C7B0]" />
                <span>Livraison (+2 000 F)</span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMode('pickup')}
                className={`p-2 rounded-md border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  deliveryMode === 'pickup'
                    ? 'border-[#D4C7B0] bg-[#1c1b18] text-white'
                    : 'border-[#232330] bg-[#121217] text-[#9ca3af]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-[#D4C7B0]" />
                <span>Retrait Boutique</span>
              </button>
            </div>

            {/* Quick user input */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                placeholder="Votre nom"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="bg-[#14141a] border border-[#2a2a38] rounded-md px-3 py-1.5 text-xs text-white placeholder-[#6b7280] outline-none focus:border-[#D4C7B0]"
              />
              <input
                type="text"
                placeholder="Quartier / Ville"
                value={customerCity}
                onChange={(e) => setCustomerCity(e.target.value)}
                className="bg-[#14141a] border border-[#2a2a38] rounded-md px-3 py-1.5 text-xs text-white placeholder-[#6b7280] outline-none focus:border-[#D4C7B0]"
              />
            </div>

            {/* Payment method selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#D4C7B0] block uppercase tracking-wider">
                Mode de règlement souhaité :
              </label>
              <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-full bg-[#14141a] border border-[#2a2a38] rounded-md px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4C7B0] cursor-pointer"
              >
                {STORE_INFO.paymentMethods.map((pm) => (
                  <option key={pm} value={pm} className="bg-[#121218]">
                    {pm}
                  </option>
                ))}
              </select>
            </div>

            {/* Total calculation */}
            <div className="p-3 bg-[#121218] rounded-lg border border-[#21212c] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#9ca3af]">
                <span>Sous-total articles :</span>
                <span className="font-mono text-white">{formatPrice(subtotalFCFA)}</span>
              </div>
              {deliveryFeeFCFA > 0 && (
                <div className="flex justify-between text-[#9ca3af]">
                  <span>Frais de livraison Cotonou :</span>
                  <span className="font-mono text-white">{formatPrice(deliveryFeeFCFA)}</span>
                </div>
              )}
              <div className="border-t border-[#1f1f2a] pt-1.5 flex justify-between items-baseline font-bold">
                <span className="text-white">Total à payer :</span>
                <span className="text-lg font-black text-[#D4C7B0] font-mono">
                  {formatPrice(totalFCFA)}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp checkout */}
            <a
              href={orderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#D4C7B0] hover:bg-[#C5B79E] text-[#09090c] font-black text-xs rounded-md flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Valider la commande sur WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
