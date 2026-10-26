import React, { useState } from 'react';
import { ShoppingBag, Eye, Heart, Sparkles, Menu, X, PhoneCall, ShieldCheck } from 'lucide-react';
import { DISPLAY_PHONE, STORE_NAME, createWhatsAppCustomLink } from '../utils/whatsapp';

export default function Navbar({ cartCount, onOpenCart, onOpenWallPreview, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#141414] via-[#221f14] to-[#141414] border-b border-[#2a2a2a] text-xs py-2 px-4 text-center tracking-wide text-neutral-300">
        <span className="inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
          <span><strong className="text-[#d4af37]">Free Nationwide Delivery</strong> on orders over Rs. 3,500</span>
          <span className="hidden sm:inline text-neutral-500">•</span>
          <span className="hidden sm:inline text-neutral-400">Cash on Delivery across Pakistan</span>
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black border border-[#333] group-hover:border-[#d4af37] transition-all duration-300 shadow-lg">
              <img 
                src="/logo/logo.jpg" 
                alt="MultiCraft Logo" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white font-serif uppercase">
                  Multi<span className="text-[#d4af37]">Craft</span>
                </span>
              </div>
              <p className="text-[10px] tracking-widest uppercase text-neutral-400 font-medium">
                Wall Art & Frames
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links (ADMIN REMOVED FROM PUBLIC NAVBAR) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <button 
              onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-[#d4af37] transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => { 
                onNavigate('home');
                const el = document.getElementById('catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#d4af37] transition-colors"
            >
              Collection
            </button>
            <button 
              onClick={() => {
                onNavigate('home');
                const el = document.getElementById('categories');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#d4af37] transition-colors"
            >
              Categories
            </button>
            <button 
              onClick={onOpenWallPreview}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1c180e] border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all text-xs font-semibold cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View On Wall</span>
            </button>
            <a 
              href={createWhatsAppCustomLink()} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#d4af37] transition-colors flex items-center gap-1"
            >
              <span>Custom Art</span>
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a 
              href={`tel:${DISPLAY_PHONE}`}
              className="hidden lg:flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-[#262626]"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{DISPLAY_PHONE}</span>
            </a>

            {/* Cart Trigger Button */}
            <button 
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-[#141414] border border-[#2a2a2a] hover:border-[#d4af37] text-white hover:text-[#d4af37] transition-all shadow-md group cursor-pointer"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#d4af37] text-black text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg ring-2 ring-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-xl bg-[#141414] border border-[#2a2a2a] text-neutral-300 hover:text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (No Admin button visible) */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0d0d0d] border-b border-[#262626] px-4 pt-3 pb-6 space-y-3">
            <button 
              onClick={() => { onNavigate('home'); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="block w-full text-left py-2 text-neutral-200 hover:text-[#d4af37]"
            >
              Home
            </button>
            <button 
              onClick={() => { 
                onNavigate('home');
                setMobileOpen(false);
                const el = document.getElementById('catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block w-full text-left py-2 text-neutral-200 hover:text-[#d4af37]"
            >
              Explore Collection
            </button>
            <button 
              onClick={() => { onOpenWallPreview(); setMobileOpen(false); }}
              className="flex items-center gap-2 py-2 text-[#d4af37] font-semibold"
            >
              <Eye className="w-4 h-4" />
              <span>Interactive "View On Wall" Tool</span>
            </button>
            <a 
              href={createWhatsAppCustomLink()} 
              target="_blank" 
              rel="noreferrer"
              className="block py-2 text-neutral-200 hover:text-[#d4af37]"
            >
              Order Custom Frame on WhatsApp
            </a>
          </div>
        )}
      </header>
    </>
  );
}
