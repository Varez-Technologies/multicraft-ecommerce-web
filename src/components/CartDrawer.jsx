import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { createWhatsAppOrderLink, NOTIFICATION_EMAIL } from '../utils/whatsapp';
import { sendOrderEmail } from '../utils/email';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onClearCart 
}) {
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    notes: ''
  });

  if (!isOpen) return null;

  // Calculate finances
  const subtotal = cartItems.reduce((acc, it) => acc + (it.itemPrice * it.quantity), 0);
  const deliveryFee = subtotal >= 3500 || subtotal === 0 ? 0 : 250;
  const grandTotal = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.city || !formData.address) {
      alert("Please fill in all delivery details (Name, Phone, City, Address).");
      return;
    }

    setIsSubmitting(true);

    const newOrder = {
      id: Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      customer: formData,
      items: cartItems,
      subtotal,
      deliveryFee,
      total: grandTotal,
      status: 'Pending'
    };

    // 1. Save to local storage for Admin Panel
    try {
      const existing = JSON.parse(localStorage.getItem('multicraft_orders') || '[]');
      existing.unshift(newOrder);
      localStorage.setItem('multicraft_orders', JSON.stringify(existing));
    } catch (e) {
      console.warn("Storage warning:", e);
    }

    // 2. Send email notification to hello.multicraft@gmail.com
    await sendOrderEmail(newOrder);

    setIsSubmitting(false);
    setLastOrder(newOrder);
    setCheckoutStep('success');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121212] border-l border-[#262626] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 bg-[#161616] border-b border-[#262626] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <h2 className="text-base font-bold text-white">
                {checkoutStep === 'cart' && `Your Bag (${cartItems.length})`}
                {checkoutStep === 'checkout' && "Delivery & Payment (COD)"}
                {checkoutStep === 'success' && "Order Confirmed!"}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-neutral-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content by Step */}
          <div className="flex-1 overflow-y-auto p-5">
            
            {/* STEP 1: CART ITEMS */}
            {checkoutStep === 'cart' && (
              <>
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-neutral-500 mb-4">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-base font-bold text-white">Your bag is empty</p>
                    <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                      Explore our handcrafted collection to add statement art to your walls.
                    </p>
                    <button 
                      onClick={onClose}
                      className="mt-6 px-6 py-2.5 rounded-xl bg-[#d4af37] text-black font-bold text-xs"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-xl bg-[#181818] border border-[#262626] flex gap-3 items-center"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-20 rounded-lg overflow-hidden bg-black shrink-0 border border-[#333]">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-[#d4af37] font-semibold mt-0.5">
                            {item.size.label} • {item.frame.name}
                          </p>
                          <p className="text-xs font-bold text-white mt-1">
                            Rs. {item.itemPrice.toLocaleString()}
                          </p>

                          {/* Qty Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-[#333] rounded-lg bg-[#111]">
                              <button 
                                onClick={() => onUpdateQty(idx, -1)}
                                className="p-1 hover:text-[#d4af37] text-neutral-400"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQty(idx, 1)}
                                className="p-1 hover:text-[#d4af37] text-neutral-400"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button 
                              onClick={() => onRemoveItem(idx)}
                              className="text-neutral-500 hover:text-red-400 p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* STEP 2: CHECKOUT FORM */}
            {checkoutStep === 'checkout' && (
              <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-300 font-bold mb-1 uppercase">Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Hammad Khan"
                    className="w-full p-2.5 rounded-xl bg-[#181818] border border-[#333] text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-bold mb-1 uppercase">Phone / WhatsApp Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0312-3456789"
                    className="w-full p-2.5 rounded-xl bg-[#181818] border border-[#333] text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-bold mb-1 uppercase">City *</label>
                  <input 
                    type="text" 
                    name="city" 
                    required 
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Karachi, Lahore, Islamabad"
                    className="w-full p-2.5 rounded-xl bg-[#181818] border border-[#333] text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-bold mb-1 uppercase">Complete Delivery Address *</label>
                  <textarea 
                    name="address" 
                    required 
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House/Apartment #, Street, Area, Landmark"
                    className="w-full p-2.5 rounded-xl bg-[#181818] border border-[#333] text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-bold mb-1 uppercase">Special Instructions / Frame Notes (Optional)</label>
                  <input 
                    type="text" 
                    name="notes" 
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Call before delivery"
                    className="w-full p-2.5 rounded-xl bg-[#181818] border border-[#333] text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#1a180e] border border-[#d4af37]/30 flex items-center gap-2 text-neutral-300">
                  <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0" />
                  <p className="text-[11px] leading-tight">
                    <strong>Payment Method:</strong> Cash on Delivery (COD). Pay when you inspect the safe wooden packaging at your doorstep.
                  </p>
                </div>
              </form>
            )}

            {/* STEP 3: SUCCESS & WHATSAPP SYNC */}
            {checkoutStep === 'success' && lastOrder && (
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#1b2b1b] border-2 border-green-500 text-green-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-xs uppercase font-bold text-green-400">Order Received!</span>
                  <h3 className="text-xl font-black text-white mt-1">
                    Order #{lastOrder.id}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 max-w-xs mx-auto">
                    Thank you, <strong className="text-white">{lastOrder.customer.name}</strong>! We have recorded your order and sent an alert to our team at <strong>{NOTIFICATION_EMAIL}</strong>.
                  </p>
                </div>

                {/* WhatsApp Quick Confirm Button */}
                <div className="p-4 rounded-2xl bg-[#1c180e] border border-[#d4af37]/40 text-left">
                  <p className="text-xs font-bold text-white mb-1">
                    ⚡ Fast-Track WhatsApp Confirmation:
                  </p>
                  <p className="text-[11px] text-neutral-400 mb-3">
                    Click below to open WhatsApp with your order details pre-filled.
                  </p>
                  <a 
                    href={createWhatsAppOrderLink(lastOrder)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>Confirm Order on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <button 
                  onClick={() => {
                    setCheckoutStep('cart');
                    onClose();
                  }}
                  className="text-xs text-neutral-400 hover:text-white underline"
                >
                  Return to Store
                </button>
              </div>
            )}

          </div>

          {/* Footer Totals & CTA */}
          {cartItems.length > 0 && checkoutStep !== 'success' && (
            <div className="p-5 bg-[#161616] border-t border-[#262626] space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Delivery</span>
                  <span className="font-semibold text-white">
                    {deliveryFee === 0 ? (
                      <span className="text-green-400 font-bold">FREE</span>
                    ) : (
                      `Rs. ${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-[#262626]">
                  <span>Total (COD)</span>
                  <span className="text-[#d4af37]">Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button 
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f24] hover:from-[#e5c148] hover:to-[#c69f2e] text-black font-extrabold text-xs tracking-wide shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceed to Delivery Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="space-y-2">
                  <button 
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f24] hover:from-[#e5c148] hover:to-[#c69f2e] text-black font-extrabold text-xs tracking-wide shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Processing Order..." : "Confirm Cash on Delivery Order"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button 
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-full py-2 text-xs text-neutral-400 hover:text-white"
                  >
                    ← Back to Bag
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
