export type Category = 'all' | 'apple' | 'samsung' | 'pixel' | 'android' | 'casques' | 'jbl' | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
  imageUrl: string;
  fallbackUrl?: string;
}

export interface StorageTier {
  size: string;
  priceFCFA: number;
  oldPriceFCFA?: number;
}

export interface Product {
  id: string;
  name: string;
  brand: 'apple' | 'samsung' | 'google' | 'android' | 'casques' | 'jbl' | 'accessories' | 'sony' | 'bose' | 'marshall' | 'beats' | 'anker' | 'protect' | 'case' | 'audio';
  tagline: string;
  category: Category;
  condition: string;
  batteryHealth?: string;
  badge?: string;
  imageFileName: string; // e.g. "sony-wh-1000xm5.png" located in /public/products/
  basePriceFCFA: number;
  oldPriceFCFA?: number;
  isPromo?: boolean;
  isNewArrival?: boolean;
  featured?: boolean;
  colors: ProductColor[];
  storageTiers: StorageTier[];
  specs: {
    screen?: string;
    chip?: string;
    camera?: string;
    battery?: string;
    stateHighlights: string[];
  };
  gifts: string[];
  inStock: boolean;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  productName: string;
  condition: string;
  imageFileName: string;
  fallbackUrl?: string;
  selectedColor: ProductColor;
  selectedStorage: StorageTier;
  unitPriceFCFA: number;
  quantity: number;
  gifts: string[];
}

export interface TradeInDevice {
  model: string;
  estimatedValueFCFA: number;
}
