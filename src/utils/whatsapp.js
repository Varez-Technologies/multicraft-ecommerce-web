export const WHATSAPP_NUMBER = "923138672725";
export const DISPLAY_PHONE = "0313-8672725";
export const NOTIFICATION_EMAIL = "hello.multicraft@gmail.com";
export const STORE_NAME = "MultiCraft";
export const STORE_TAGLINE = "Wall Art & Frames";
export const STORE_CITY = "Pakistan Nationwide Delivery";

// Build direct WhatsApp Order URL
export function createWhatsAppOrderLink(order) {
  const itemsText = order.items.map((it, idx) => 
    `${idx + 1}. *${it.title}*\n   Size: ${it.size.label} | Frame: ${it.frame.name}\n   Qty: ${it.quantity} x Rs. ${it.itemPrice.toLocaleString()} = Rs. ${(it.quantity * it.itemPrice).toLocaleString()}`
  ).join("\n\n");

  const msg = 
`*NEW ORDER - MULTICRAFT* 🎨
Order ID: #${order.id}
Date: ${new Date().toLocaleDateString('en-PK')}

*Items:*
${itemsText}

*Subtotal:* Rs. ${order.subtotal.toLocaleString()}
*Delivery:* ${order.deliveryFee === 0 ? "FREE" : "Rs. " + order.deliveryFee}
*TOTAL AMOUNT:* Rs. ${order.total.toLocaleString()} (Cash on Delivery)

*Customer Details:*
👤 Name: ${order.customer.name}
📱 Phone: ${order.customer.phone}
📍 City: ${order.customer.city}
🏠 Address: ${order.customer.address}
📝 Note: ${order.customer.notes || "None"}

Please confirm my order. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// Build custom art inquiry link
export function createWhatsAppCustomLink() {
  const msg = `Salam MultiCraft! Mujhe ek customized wall art frame banwana hai. Please details share kar dein.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
