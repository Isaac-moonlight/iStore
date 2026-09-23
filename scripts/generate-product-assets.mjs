import fs from 'fs';
import path from 'path';

const outDir = path.resolve(process.cwd(), 'public/products');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Complete Product Asset Catalog for iStore 1010
const products = [
  // ==========================================
  // APPLE IPHONES
  // ==========================================
  { id: 'iphone-18-pro-max', title: 'iPhone 18 Pro Max', sub: 'A19 Pro · Titane Sable', brand: 'APPLE', color: '#cbb8a3', bg: '#1c1b18', type: 'phone', tag: 'VEDETTE' },
  { id: 'iphone-18-pro', title: 'iPhone 18 Pro', sub: 'A19 Pro · 6,3" Titane', brand: 'APPLE', color: '#cbb8a3', bg: '#1c1b18', type: 'phone', tag: 'VEDETTE' },
  { id: 'iphone-16-pro-max', title: 'iPhone 16 Pro Max', sub: 'Puce A18 Pro · Titane Désert', brand: 'APPLE', color: '#cbb8a3', bg: '#1c1b18', type: 'phone', tag: 'NOUVEAU' },
  { id: 'iphone-15-pro-max', title: 'iPhone 15 Pro Max', sub: 'Puce A17 Pro · Châssis Titane', brand: 'APPLE', color: '#9e968b', bg: '#18181a', type: 'phone', tag: 'PREMIUM' },
  { id: 'iphone-14-pro-max', title: 'iPhone 14 Pro Max', sub: 'Dynamic Island · Puce A16', brand: 'APPLE', color: '#695f75', bg: '#1a181d', type: 'phone', tag: 'OCCASION 10/10' },
  { id: 'iphone-13-pro-max', title: 'iPhone 13 Pro Max', sub: 'ProMotion 120Hz · Sierra Blue', brand: 'APPLE', color: '#889eb2', bg: '#15191d', type: 'phone', tag: 'OCCASION 10/10' },
  { id: 'iphone-13', title: 'iPhone 13 Standard', sub: 'Puce A15 Bionic · Double capteur', brand: 'APPLE', color: '#27384a', bg: '#15181c', type: 'phone', tag: 'DISPONIBLE' },
  { id: 'iphone-12-pro', title: 'iPhone 12 Pro', sub: 'Triple caméra LiDAR · Acier', brand: 'APPLE', color: '#7a8084', bg: '#171819', type: 'phone', tag: 'OCCASION 10/10' },
  { id: 'iphone-11', title: 'iPhone 11 Standard', sub: 'Ultra grand-angle · Autonomie', brand: 'APPLE', color: '#2b2b2b', bg: '#161616', type: 'phone', tag: 'BEST-SELLER' },

  // ==========================================
  // CASQUES AUDIO SANS FIL & HI-FI (NOUVEAU !)
  // ==========================================
  { id: 'airpods-max', title: 'Apple AirPods Max', sub: 'Audio Spatial · Réduction Bruit Pro', brand: 'APPLE', color: '#323236', bg: '#141416', type: 'headphone', tag: 'LUXE' },
  { id: 'sony-wh-1000xm5', title: 'Sony WH-1000XM5', sub: 'N°1 Réduction de Bruit · LDAC', brand: 'SONY', color: '#222224', bg: '#141417', type: 'headphone', tag: 'RÉFÉRENCE' },
  { id: 'sony-wh-1000xm4', title: 'Sony WH-1000XM4', sub: 'Pliable · Confort Absolu · 30h', brand: 'SONY', color: '#2c2927', bg: '#161514', type: 'headphone', tag: 'TOP VENTE' },
  { id: 'bose-qc-ultra', title: 'Bose QC Ultra', sub: 'Son Immersif Spatial · QuietComfort', brand: 'BOSE', color: '#1f1f21', bg: '#141416', type: 'headphone', tag: 'PRESTIGE' },
  { id: 'jbl-tour-one-m2', title: 'JBL Tour One M2', sub: 'True Adaptive ANC · Hi-Res 50h', brand: 'JBL', color: '#252528', bg: '#151518', type: 'headphone', tag: 'ORIGINAL' },
  { id: 'jbl-live-770nc', title: 'JBL Live 770NC', sub: 'Personi-Fi 2.0 · 65h Autonomie', brand: 'JBL', color: '#1e242b', bg: '#14171a', type: 'headphone', tag: 'BASS PRO' },
  { id: 'jbl-tune-770nc', title: 'JBL Tune 770NC', sub: 'Pure Bass JBL · Réduction Bruit', brand: 'JBL', color: '#202022', bg: '#151517', type: 'headphone', tag: 'BEST-SELLER' },
  { id: 'jbl-tune-520bt', title: 'JBL Tune 520BT', sub: 'Léger & Pliable · 57h Autonomie', brand: 'JBL', color: '#1a1a1c', bg: '#141415', type: 'headphone', tag: 'PRIX DOUX' },
  { id: 'marshall-major-iv', title: 'Marshall Major IV', sub: 'Look Rétro Rock · 80h Autonomie', brand: 'MARSHALL', color: '#2a241e', bg: '#171512', type: 'headphone', tag: '80H SANS FIL' },
  { id: 'beats-studio-pro', title: 'Beats Studio Pro', sub: 'Audio Spatial Personnalisé USB-C', brand: 'BEATS', color: '#382a2a', bg: '#1a1515', type: 'headphone', tag: 'ORIGINAL' },

  // ==========================================
  // SAMSUNG GALAXY (GAMME ULTRA & A)
  // ==========================================
  { id: 'samsung-s24-ultra', title: 'Galaxy S24 Ultra', sub: 'Galaxy AI · S-Pen · 200 Mpx', brand: 'SAMSUNG', color: '#575653', bg: '#191816', type: 'phone', tag: 'FLAGSHIP' },
  { id: 'samsung-s24-plus', title: 'Galaxy S24+', sub: 'Écran QHD+ 6,7" · 12 Go RAM', brand: 'SAMSUNG', color: '#3b3b42', bg: '#161619', type: 'phone', tag: 'GALAXY AI' },
  { id: 'samsung-s23-ultra', title: 'Galaxy S23 Ultra', sub: 'Snapdragon 8 Gen 2 · Zoom 100x', brand: 'SAMSUNG', color: '#2b302c', bg: '#151815', type: 'phone', tag: 'DISPONIBLE' },
  { id: 'samsung-s22-ultra', title: 'Galaxy S22 Ultra', sub: 'S-Pen intégré · Écran Dynamic AMOLED', brand: 'SAMSUNG', color: '#4a2d33', bg: '#191416', type: 'phone', tag: 'OCCASION 10/10' },
  { id: 'samsung-s21-ultra', title: 'Galaxy S21 Ultra', sub: '108 Mpx · Double téléobjectif · 120Hz', brand: 'SAMSUNG', color: '#222224', bg: '#141416', type: 'phone', tag: 'AFFAIRE EN OR' },
  { id: 'samsung-z-flip-5', title: 'Galaxy Z Flip 5', sub: 'Pliable Compact · Écran externe 3.4"', brand: 'SAMSUNG', color: '#3a4740', bg: '#151816', type: 'phone', tag: 'TENDANCE' },
  { id: 'samsung-z-fold-5', title: 'Galaxy Z Fold 5', sub: 'Écran Dépliable 7.6" Multitâche', brand: 'SAMSUNG', color: '#253444', bg: '#14171b', type: 'phone', tag: 'LUXE' },
  { id: 'samsung-a55', title: 'Galaxy A55 5G', sub: 'Châssis Métal · Écran Super AMOLED 120Hz', brand: 'SAMSUNG', color: '#2a3a4d', bg: '#14181d', type: 'phone', tag: 'NOUVEAU' },
  { id: 'samsung-a54', title: 'Galaxy A54 5G', sub: '50 Mpx OIS · Verre Gorilla Glass 5', brand: 'SAMSUNG', color: '#354337', bg: '#151815', type: 'phone', tag: 'BEST-SELLER' },
  { id: 'samsung-a35', title: 'Galaxy A35 5G', sub: '50 Mpx OIS · 5000 mAh', brand: 'SAMSUNG', color: '#2d3844', bg: '#14171a', type: 'phone', tag: 'RAPPORT Q/P' },
  { id: 'samsung-a25', title: 'Galaxy A25 5G', sub: 'Super AMOLED 120Hz · Son Stéréo', brand: 'SAMSUNG', color: '#212a36', bg: '#13161a', type: 'phone', tag: '5G ACCESSIBLE' },
  { id: 'samsung-a15', title: 'Galaxy A15', sub: 'Autonomie longue durée 5000 mAh', brand: 'SAMSUNG', color: '#1e2530', bg: '#131518', type: 'phone', tag: 'ACCESSIBLE' },
  { id: 'galaxy-buds-2-pro', title: 'Galaxy Buds 2 Pro', sub: 'Audio Hi-Fi 24 bits & ANC', brand: 'SAMSUNG', color: '#282828', bg: '#151515', type: 'audio', tag: 'ORIGINAL' },
  { id: 'chargeur-samsung-45w', title: 'Chargeur Samsung 45W', sub: 'Super Fast Charging 2.0 USB-C', brand: 'SAMSUNG', color: '#1a1a1a', bg: '#141414', type: 'charge', tag: 'ORIGINAL' },

  // ==========================================
  // GOOGLE PIXEL (EXPÉRIENCE ANDROID PURE & PLIANTE)
  // ==========================================
  { id: 'pixel-9-pro-xl', title: 'Pixel 9 Pro XL', sub: 'Google Tensor G4 · Gemini Nano', brand: 'GOOGLE', color: '#3c4043', bg: '#161718', type: 'phone', tag: 'DERNIER CRI' },
  { id: 'pixel-9-pro-fold', title: 'Pixel 9 Pro Fold', sub: 'Écran Pliant 8" Super Actua', brand: 'GOOGLE', color: '#2d2f32', bg: '#151617', type: 'phone', tag: 'NOUVEAU PLIANT' },
  { id: 'pixel-9', title: 'Pixel 9 Standard', sub: 'Format 6,3" · Puce Tensor G4', brand: 'GOOGLE', color: '#4a363d', bg: '#181416', type: 'phone', tag: 'NOUVEAU' },
  { id: 'pixel-8-pro', title: 'Pixel 8 Pro', sub: 'Thermomètre · Meilleure Photo IA', brand: 'GOOGLE', color: '#2c3c4e', bg: '#14181c', type: 'phone', tag: 'PRODUIT PHARE' },
  { id: 'pixel-8', title: 'Pixel 8 Standard', sub: 'Puce Tensor G3 · 120Hz OLED', brand: 'GOOGLE', color: '#383028', bg: '#161412', type: 'phone', tag: 'COMPACT PRO' },
  { id: 'pixel-7-pro', title: 'Pixel 7 Pro', sub: 'Zoom 30x · Écran 6,7" 120Hz', brand: 'GOOGLE', color: '#2e332f', bg: '#141614', type: 'phone', tag: 'OCCASION 10/10' },
  { id: 'pixel-7a', title: 'Pixel 7a', sub: '90Hz · Recharge sans fil · 64 Mpx', brand: 'GOOGLE', color: '#273440', bg: '#131618', type: 'phone', tag: 'POPULAIRE' },
  { id: 'pixel-6-pro', title: 'Pixel 6 Pro', sub: 'Zoom Optique 4x · Écran 120Hz incurvé', brand: 'GOOGLE', color: '#282b2d', bg: '#141516', type: 'phone', tag: 'BON PLAN' },
  { id: 'pixel-6a', title: 'Pixel 6a', sub: 'Compact & Puissant Tensor', brand: 'GOOGLE', color: '#252627', bg: '#131314', type: 'phone', tag: 'PRIX DOUX' },

  // ==========================================
  // XIAOMI, TECNO, INFINIX & ONEPLUS
  // ==========================================
  { id: 'xiaomi-14-ultra', title: 'Xiaomi 14 Ultra', sub: 'Capteur 1 pouce Leica · 8 Gen 3', brand: 'XIAOMI', color: '#242426', bg: '#151517', type: 'phone', tag: 'LEICA 1"' },
  { id: 'redmi-note-13-pro', title: 'Redmi Note 13 Pro+', sub: '200 Mpx · Charge ultra rapide 120W', brand: 'XIAOMI', color: '#38344c', bg: '#17151b', type: 'phone', tag: '120W HYPER' },
  { id: 'poco-x6-pro', title: 'POCO X6 Pro 5G', sub: 'Dimensity 8300-Ultra · Écran 1.5K', brand: 'POCO', color: '#4a4220', bg: '#171612', type: 'phone', tag: 'GAMING SPEED' },
  { id: 'tecno-camon-30-premier', title: 'Tecno Camon 30 Premier', sub: 'Puce Sony PolarAce · Écran LTPO 1.5K', brand: 'TECNO', color: '#22252a', bg: '#141517', type: 'phone', tag: 'SONY POLAR' },
  { id: 'tecno-camon-30-pro', title: 'Tecno Camon 30 Pro', sub: 'Dimensity 8200 · 50 Mpx Sony OIS', brand: 'TECNO', color: '#1e242b', bg: '#131518', type: 'phone', tag: '5G PERFORMANCE' },
  { id: 'tecno-phantom-v-fold', title: 'Tecno Phantom V Fold', sub: 'Écran Pliant 7.85" 120Hz LTPO', brand: 'TECNO', color: '#2c2522', bg: '#161412', type: 'phone', tag: 'PLIABLE LUXE' },
  { id: 'infinix-note-40-pro', title: 'Infinix Note 40 Pro+', sub: 'FastCharge 100W + MagCharge Sans Fil', brand: 'INFINIX', color: '#3b3428', bg: '#171512', type: 'phone', tag: '100W MULTI' },
  { id: 'infinix-zero-30-5g', title: 'Infinix Zero 30 5G', sub: 'Selfie 4K 60fps · Écran incurvé 144Hz', brand: 'INFINIX', color: '#303947', bg: '#14161a', type: 'phone', tag: '4K VLOG' },
  { id: 'oneplus-12', title: 'OnePlus 12', sub: 'Snapdragon 8 Gen 3 · Caméra Hasselblad', brand: 'ONEPLUS', color: '#253832', bg: '#131715', type: 'phone', tag: 'HASSELBLAD' },

  // ==========================================
  // ENCEINTES JBL
  // ==========================================
  { id: 'jbl-boombox-3', title: 'JBL Boombox 3', sub: 'Puissance 180W RMS · Basses Pro', brand: 'JBL', color: '#242424', bg: '#151515', type: 'speaker', tag: 'ORIGINAL' },
  { id: 'jbl-charge-5', title: 'JBL Charge 5', sub: 'Étanche IP67 · Powerbank 20h', brand: 'JBL', color: '#1f2530', bg: '#14161b', type: 'speaker', tag: 'BEST-SELLER' },
  { id: 'jbl-flip-6', title: 'JBL Flip 6', sub: 'Son 2 voies puissant & compact', brand: 'JBL', color: '#4a241b', bg: '#171413', type: 'speaker', tag: 'PORTABLE' },
  { id: 'jbl-partybox-encore', title: 'JBL PartyBox Encore', sub: 'Avec Micro Sans Fil inclus', brand: 'JBL', color: '#181818', bg: '#121212', type: 'speaker', tag: 'PARTY' },
  { id: 'jbl-clip-4', title: 'JBL Clip 4', sub: 'Mousqueton intégré · IP67', brand: 'JBL', color: '#21292d', bg: '#131517', type: 'speaker', tag: 'MINI' },

  // ==========================================
  // ACCESSOIRES & AIRPODS & WATCH
  // ==========================================
  { id: 'airpods-pro-2', title: 'AirPods Pro 2 USB-C', sub: 'ANC Réduction Bruit Active', brand: 'APPLE', color: '#eaeaea', bg: '#161616', type: 'audio', tag: 'ORIGINAL' },
  { id: 'airpods-3', title: 'AirPods 3', sub: 'Audio Spatial personnalisé', brand: 'APPLE', color: '#eaeaea', bg: '#161616', type: 'audio', tag: 'ORIGINAL' },
  { id: 'apple-watch-ultra-2', title: 'Apple Watch Ultra 2', sub: 'Titane 49mm · GPS + Cellular', brand: 'APPLE', color: '#cbb8a3', bg: '#181614', type: 'watch', tag: 'NOUVEAU' },
  { id: 'chargeur-apple-20w', title: 'Pack Chargeur 20W', sub: 'Adaptateur USB-C + Câble', brand: 'APPLE', color: '#f5f5f5', bg: '#161616', type: 'charge', tag: 'EN BOÎTE' },
  { id: 'batterie-magsafe', title: 'Batterie MagSafe Apple', sub: 'Powerbank Magnétique Sans Fil', brand: 'APPLE', color: '#dedede', bg: '#161616', type: 'charge', tag: 'ORIGINAL' },
  { id: 'airtag', title: 'Apple AirTag', sub: 'Balise de localisation précise', brand: 'APPLE', color: '#d8d8d8', bg: '#151515', type: 'accessory', tag: 'PACK DISPO' },
  { id: 'cable-apple-usbc', title: 'Câble Tressé USB-C 60W', sub: '1 mètre tressé résistant', brand: 'APPLE', color: '#f0f0f0', bg: '#161616', type: 'accessory', tag: 'ORIGINAL' },
  { id: 'powerbank-anker-20000', title: 'Power Bank Anker 20K', sub: 'Charge rapide 22.5W USB-C', brand: 'ANKER', color: '#262628', bg: '#141416', type: 'charge', tag: '20 000 MAH' },
  { id: 'verre-trempe-9d', title: 'Verre Trempé 9D', sub: 'Protection Anti-espion / Anti-choc', brand: 'PROTECT', color: '#2b2b2b', bg: '#151515', type: 'accessory', tag: 'PACK DUO' },
  { id: 'coque-silicone-magsafe', title: 'Coque MagSafe Silicone', sub: 'Toucher velours & Aimant puissant', brand: 'CASE', color: '#574635', bg: '#171513', type: 'accessory', tag: 'PREMIUM' },
  { id: 'adaptateur-jack-usbc', title: 'Adaptateur Jack vers USB-C', sub: 'DAC Audio haute fidélité', brand: 'AUDIO', color: '#e0e0e0', bg: '#161616', type: 'accessory', tag: 'ORIGINAL' }
];

function generateDarkSVG(p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <!-- Background Gradient Deep Dark Stealth -->
    <linearGradient id="darkBgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#141418"/>
      <stop offset="50%" stop-color="${p.bg}"/>
      <stop offset="100%" stop-color="#070709"/>
    </linearGradient>
    <linearGradient id="neonAshBeige" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#D4C7B0"/>
      <stop offset="100%" stop-color="#C5B79E"/>
    </linearGradient>
    <linearGradient id="deviceSurface" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${p.color}"/>
      <stop offset="100%" stop-color="#0a0a0c"/>
    </linearGradient>
    <filter id="darkGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="28" flood-color="${p.color}" flood-opacity="0.32"/>
    </filter>
  </defs>

  <!-- Deep Black Base -->
  <rect width="800" height="800" rx="36" fill="url(#darkBgGrad)"/>
  
  <!-- Subtle Glowing Border -->
  <rect x="14" y="14" width="772" height="772" rx="30" fill="none" stroke="#2a2a35" stroke-width="2"/>
  <rect x="18" y="18" width="764" height="764" rx="28" fill="none" stroke="url(#neonAshBeige)" stroke-width="1" opacity="0.35"/>

  <!-- Brand & Badge Header -->
  <g transform="translate(60, 68)">
    <rect x="0" y="0" width="94" height="28" rx="8" fill="#1c1c24" stroke="#383848" stroke-width="1"/>
    <text x="47" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="900" fill="#f5eedc" text-anchor="middle" letter-spacing="1.5">${p.brand}</text>
    
    <rect x="106" y="0" width="130" height="28" rx="8" fill="#1c1b18" stroke="#D4C7B0" stroke-width="1"/>
    <text x="171" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#D4C7B0" text-anchor="middle">${p.tag}</text>
  </g>

  <!-- Signature iStore 1010 Watermark -->
  <text x="740" y="86" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="900" fill="#D4C7B0" text-anchor="end" letter-spacing="1.2">iStore 1010</text>

  <!-- Device Artwork -->
  <g transform="translate(400, 415)" filter="url(#darkGlow)">
    <!-- Shadow Floor -->
    <ellipse cx="0" cy="205" rx="210" ry="16" fill="#000000" opacity="0.7"/>

    ${p.type === 'phone' ? `
      <!-- Smartphone Body -->
      <rect x="-140" y="-220" width="280" height="420" rx="46" fill="url(#deviceSurface)" stroke="#D4C7B0" stroke-width="2.5"/>
      <!-- Screen Inner OLED -->
      <rect x="-128" y="-208" width="256" height="396" rx="38" fill="#050507"/>
      <!-- Camera Punch / Dynamic Island -->
      <rect x="-38" y="-196" width="76" height="18" rx="9" fill="#000000" stroke="#333333" stroke-width="1"/>
      <circle cx="20" cy="-187" r="4" fill="#3b82f6"/>
      
      <!-- Screen Lighting Effect -->
      <ellipse cx="0" cy="30" rx="100" ry="70" fill="${p.color}" opacity="0.35"/>
      <circle cx="0" cy="-30" r="70" fill="#D4C7B0" opacity="0.18"/>

      <text x="0" y="12" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle">${p.title}</text>
      <text x="0" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#d1d5db" text-anchor="middle">${p.sub}</text>
      <!-- Nav Indicator -->
      <rect x="-45" y="170" width="90" height="4" rx="2" fill="#ffffff" opacity="0.6"/>
    ` : p.type === 'headphone' ? `
      <!-- Over-Ear Headphone Artwork -->
      <!-- Headband Arc -->
      <path d="M -130,-20 C -130,-170 130,-170 130,-20" fill="none" stroke="url(#deviceSurface)" stroke-width="28" stroke-linecap="round"/>
      <path d="M -125,-20 C -125,-155 125,-155 125,-20" fill="none" stroke="#252528" stroke-width="12" stroke-linecap="round"/>
      <!-- Ear Cups -->
      <g transform="translate(-130, 20)">
        <ellipse cx="0" cy="0" rx="42" ry="75" fill="url(#deviceSurface)" stroke="#D4C7B0" stroke-width="2.5"/>
        <ellipse cx="6" cy="0" rx="30" ry="60" fill="#09090b"/>
      </g>
      <g transform="translate(130, 20)">
        <ellipse cx="0" cy="0" rx="42" ry="75" fill="url(#deviceSurface)" stroke="#D4C7B0" stroke-width="2.5"/>
        <ellipse cx="-6" cy="0" rx="30" ry="60" fill="#09090b"/>
      </g>
      <!-- Center Model Glow -->
      <text x="0" y="55" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle">${p.title}</text>
      <text x="0" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#D4C7B0" text-anchor="middle">${p.sub}</text>
    ` : p.type === 'speaker' ? `
      <!-- Speaker Body Cylindrical -->
      <rect x="-180" y="-100" width="360" height="200" rx="100" fill="url(#deviceSurface)" stroke="#D4C7B0" stroke-width="2.5"/>
      <ellipse cx="-160" cy="0" rx="25" ry="80" fill="#0c0c0e" stroke="#D4C7B0" stroke-width="2"/>
      <ellipse cx="160" cy="0" rx="25" ry="80" fill="#0c0c0e" stroke="#D4C7B0" stroke-width="2"/>
      <rect x="-55" y="-30" width="110" height="60" rx="14" fill="#e65100"/>
      <text x="0" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">JBL</text>
      <text x="0" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#ffffff" text-anchor="middle">${p.title}</text>
    ` : p.type === 'watch' ? `
      <!-- Watch Case -->
      <rect x="-105" y="-135" width="210" height="270" rx="60" fill="url(#deviceSurface)" stroke="#D4C7B0" stroke-width="3"/>
      <rect x="-90" y="-120" width="180" height="240" rx="46" fill="#000000"/>
      <circle cx="0" cy="-20" r="55" fill="none" stroke="#D4C7B0" stroke-width="4"/>
      <text x="0" y="-12" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="900" fill="#ffffff" text-anchor="middle">10:10</text>
      <text x="0" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#D4C7B0" text-anchor="middle">ULTRA TITANE</text>
      <text x="0" y="180" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800" fill="#ffffff" text-anchor="middle">${p.title}</text>
    ` : `
      <!-- Accessory / Powerbank / Buds Case -->
      <rect x="-130" y="-130" width="260" height="260" rx="34" fill="#141418" stroke="#D4C7B0" stroke-width="2.5"/>
      <rect x="-90" y="-90" width="180" height="180" rx="24" fill="${p.bg}" stroke="#33333d" stroke-width="1.5"/>
      <circle cx="0" cy="-10" r="42" fill="#0a0a0c"/>
      <polygon points="-6,-32 10,-32 0,-12 12,-12 -8,16 0,-4 -8,-4" fill="#D4C7B0"/>
      <text x="0" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800" fill="#ffffff" text-anchor="middle">${p.title}</text>
      <text x="0" y="64" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#D4C7B0" text-anchor="middle">${p.sub}</text>
    `}
  </g>

  <!-- Bottom Certificate Seal -->
  <g transform="translate(400, 736)">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#D4C7B0" text-anchor="middle">
      Produit 100% Original Certifié · iStore 1010 Cotonou &amp; Expéditions
    </text>
  </g>
</svg>`;
}

for (const p of products) {
  const svgContent = generateDarkSVG(p);
  fs.writeFileSync(path.join(outDir, `${p.id}.svg`), svgContent, 'utf-8');
  fs.writeFileSync(path.join(outDir, `${p.id}.png`), svgContent, 'utf-8');
}

console.log(`Generated ${products.length} dark-themed product images in ${outDir}`);
