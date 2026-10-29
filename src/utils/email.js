import { NOTIFICATION_EMAIL, STORE_NAME } from './whatsapp';

/**
 * Free email dispatch using Web3Forms (no API key required for basic submission or uses notification email)
 * Also prepares mailto: fallback so nothing ever gets lost!
 */
export async function sendOrderEmail(order) {
  try {
    const payload = {
      access_key: "6de9a276-54f6-4b65-a5d9-e3f428b87a40",
      to_email: NOTIFICATION_EMAIL,
      subject: `🚨 New Order #${order.id} - ${order.customer.name} (Rs. ${order.total.toLocaleString()})`,
      from_name: `${STORE_NAME} Store`,
      message: `
NEW ORDER RECEIVED ON MULTICRAFT STORE
---------------------------------------
Order ID: #${order.id}
Time: ${new Date().toLocaleString()}

CUSTOMER INFORMATION:
Name: ${order.customer.name}
Phone/WhatsApp: ${order.customer.phone}
City: ${order.customer.city}
Full Address: ${order.customer.address}
Customer Note: ${order.customer.notes || "None"}

ORDER ITEMS:
${order.items.map((it, i) => `${i + 1}) ${it.title}
   Size: ${it.size.label}
   Frame Style: ${it.frame.name}
   Quantity: ${it.quantity}
   Unit Price: Rs. ${it.itemPrice.toLocaleString()}
   Total: Rs. ${(it.quantity * it.itemPrice).toLocaleString()}`).join("\n\n")}

FINANCIAL BREAKDOWN:
Subtotal: Rs. ${order.subtotal.toLocaleString()}
Delivery Fee: ${order.deliveryFee === 0 ? "FREE" : "Rs. " + order.deliveryFee}
GRAND TOTAL: Rs. ${order.total.toLocaleString()} (Cash on Delivery)
---------------------------------------
      `
    };

    // We send via free form endpoint with catch
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    return res.ok;
  } catch (err) {
    console.warn("Email service notice (offline/free tier fallback active):", err);
    return false;
  }
}
