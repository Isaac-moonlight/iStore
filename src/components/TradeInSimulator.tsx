import React, { useState } from 'react';
import { X, RefreshCw, MessageCircle } from 'lucide-react';
import { SWAP_MODELS, PRODUCTS, STORE_INFO } from '../data/products';
import { formatPrice, generateWhatsAppLink } from '../utils/format';

interface TradeInSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TradeInSimulator: React.FC<TradeInSimulatorProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [selectedModel, setSelectedModel] = useState(SWAP_MODELS[0].model);
  const [condition, setCondition] = useState<'clean' | 'light_scratches' | 'repaired'>('clean');
  const [targetModelId, setTargetModelId] = useState(PRODUCTS[0].id);

  const currentModelData = SWAP_MODELS.find((m) => m.model === selectedModel) || SWAP_MODELS[0];
  const targetProduct = PRODUCTS.find((p) => p.id === targetModelId) || PRODUCTS[0];

  let conditionMultiplier = 1;
  if (condition === 'light_scratches') conditionMultiplier = 0.88;
  if (condition === 'repaired') conditionMultiplier = 0.72;

  const estimatedTradeValue = Math.round(currentModelData.estimatedValueFCFA * conditionMultiplier);
  const remainingDifference = Math.max(0, targetProduct.basePriceFCFA - estimatedTradeValue);

  const swapWhatsAppMessage = `Bonjour iStore 1010, je souhaite faire un Troc / Reprise :
- Mon appareil actuel : ${selectedModel}
- État physique : ${condition === 'clean' ? 'Propre 10/10' : condition === 'light_scratches' ? 'Traces légères' : 'Écran changé'}
- Estimation de reprise : ${formatPrice(estimatedTradeValue)}
- Modèle souhaité : ${targetProduct.name} (${formatPrice(targetProduct.basePriceFCFA)})
- Différence restante estimée : ~${formatPrice(remainingDifference)}

Je vous transmets les photos de mon appareil pour validation !`;

  const whatsAppUrl = generateWhatsAppLink(STORE_INFO.whatsappNumber, swapWhatsAppMessage);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0d0d12] border border-[#272736] rounded-xl p-5 sm:p-6 text-[#f3f4f6] shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#1e1e2b] pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#D4C7B0]" />
              <span>Simulateur Troc &amp; Reprise</span>
            </h2>
            <p className="text-xs text-[#9ca3af]">
              Donnez votre ancien appareil et réglez simplement la différence.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#9ca3af] hover:text-white rounded-md hover:bg-[#1a1a24] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1 */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#D4C7B0] block uppercase tracking-wider">
            1. Votre modèle actuel à échanger :
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full bg-[#14141a] border border-[#2c2c3b] rounded-md px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#D4C7B0] cursor-pointer"
          >
            {SWAP_MODELS.map((item) => (
              <option key={item.model} value={item.model} className="bg-[#121218]">
                {item.model}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2 */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#D4C7B0] block uppercase tracking-wider">
            2. État physique de votre appareil :
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'clean', label: 'Propre 10/10' },
              { id: 'light_scratches', label: 'Traces légères' },
              { id: 'repaired', label: 'Écran réparé' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setCondition(st.id as any)}
                className={`p-2.5 rounded-md border text-center cursor-pointer transition-all ${
                  condition === st.id
                    ? 'border-[#D4C7B0] bg-[#1c1b18] text-white font-bold shadow-xs'
                    : 'border-[#262633] bg-[#121218] text-[#9ca3af]'
                }`}
              >
                <div className="text-xs">{st.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3 */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#D4C7B0] block uppercase tracking-wider">
            3. Nouveau modèle que vous souhaitez acquérir :
          </label>
          <select
            value={targetModelId}
            onChange={(e) => setTargetModelId(e.target.value)}
            className="w-full bg-[#14141a] border border-[#2c2c3b] rounded-md px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#D4C7B0] cursor-pointer"
          >
            {PRODUCTS.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#121218]">
                {p.name} ({formatPrice(p.basePriceFCFA)})
              </option>
            ))}
          </select>
        </div>

        {/* Estimate Card */}
        <div className="p-4 bg-[#121218] rounded-lg border border-[#21212d] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#9ca3af]">
            <span>Reprise estimée de votre appareil :</span>
            <span className="font-mono font-bold text-[#10b981]">
              +{formatPrice(estimatedTradeValue)}
            </span>
          </div>

          <div className="pt-2 border-t border-[#1e1e29] flex items-center justify-between">
            <span className="text-xs font-bold text-white">Différence restante à régler :</span>
            <span className="text-lg font-black text-[#D4C7B0] font-mono">
              ~{formatPrice(remainingDifference)}
            </span>
          </div>
        </div>

        {/* Action */}
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 bg-[#D4C7B0] hover:bg-[#C5B79E] text-[#09090c] text-xs font-black rounded-md flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Finaliser l'échange sur WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
