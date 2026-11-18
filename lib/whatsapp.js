export const WHATSAPP_NUMBER = "254713190778";

export function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message) {
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
}
