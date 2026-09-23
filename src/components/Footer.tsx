import React from 'react';
import { MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { generateWhatsAppLink } from '../utils/format';

export const Footer: React.FC = () => {
  const whatsAppUrl = generateWhatsAppLink(
    STORE_INFO.whatsappNumber,
    "Bonjour iStore 1010, je vous contacte depuis votre boutique en ligne."
  );

  return (
    <footer className="bg-[#08080b] border-t border-[#1a1a23] text-[#9ca3af] text-xs py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#14141a] border border-[#D4C7B0]/40 flex items-center justify-center font-black text-xs text-white shadow-xs">
            <span>10</span>
            <span className="text-[#D4C7B0]">10</span>
          </div>
          <div>
            <span className="font-extrabold text-white text-sm">iStore 1010</span>
            <p className="text-[11px] text-[#6b7280]">
              Smartphones d'origine, Casques Hi-Fi &amp; Accessoires · Neufs &amp; Occasions 10/10
            </p>
          </div>
        </div>

        {/* Contacts */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-white">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#D4C7B0] transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#D4C7B0]" />
            <span className="font-semibold">WhatsApp : {STORE_INFO.whatsappDisplay}</span>
          </a>

          <a
            href={STORE_INFO.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#D4C7B0] transition-colors text-[#9ca3af]"
          >
            <span>TikTok :</span>
            <span className="font-semibold text-white">{STORE_INFO.tiktokHandle}</span>
            <ExternalLink className="w-3 h-3 text-[#6b7280]" />
          </a>

          <div className="flex items-center gap-1.5 text-[#9ca3af]">
            <MapPin className="w-3.5 h-3.5 text-[#D4C7B0]" />
            <span>Cotonou, Bénin &amp; Expéditions</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-[#52525b]">
          © {new Date().getFullYear()} iStore 1010. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};
