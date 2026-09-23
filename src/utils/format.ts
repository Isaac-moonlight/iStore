export function formatPrice(priceFCFA: number): string {
  return `${priceFCFA.toLocaleString('fr-FR')} FCFA`;
}

export function generateWhatsAppLink(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
