import React, { useState } from 'react';
import { Mail, Phone, MapPin, Share2, ShieldCheck, Heart, Lock } from 'lucide-react';
import { DISPLAY_PHONE, NOTIFICATION_EMAIL, STORE_NAME, STORE_TAGLINE } from '../utils/whatsapp';

export default function Footer({ onOpenAdminLogin }) {
  return (
    <footer className="bg-[#070707] border-t border-[#1a1a1a] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-[#333]">
                <img src="/logo/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xl font-black text-white uppercase tracking-wider font-serif">
                  Multi<span className="text-[#d4af37]">Craft</span>
                </span>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{STORE_TAGLINE}</p>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Handcrafted in Pakistan. We specialize in archival-grade canvas wall decor, automotive passion art, Urdu literary calligraphy, and modern aesthetic frames.
            </p>

            <div className="pt-2 flex items-center gap-3 text-white">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-[#141414] border border-[#262626] hover:text-[#d4af37] flex items-center gap-1.5 text-xs font-bold">
                <Share2 className="w-4 h-4 text-[#d4af37]" />
                <span>@multicraft</span>
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Collections</h4>
            <ul className="space-y-2">
              {['Motivational', 'Automotive', 'Gaming', 'Urdu Poetry'].map(c => (
                <li key={c}>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#d4af37] transition-colors cursor-pointer"
                  >
                    {c} Wall Art
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2">
              <li><span>Free Delivery over Rs. 3,500</span></li>
              <li><span>Cash on Delivery (COD)</span></li>
              <li><span>Zero-Damage Wooden Crate</span></li>
              <li><span>Custom Size Consultation</span></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <a href={`tel:${DISPLAY_PHONE}`} className="hover:text-white">{DISPLAY_PHONE}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                <a href={`mailto:${NOTIFICATION_EMAIL}`} className="hover:text-white break-all">{NOTIFICATION_EMAIL}</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Nationwide Delivery across Pakistan</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with discrete Owner Portal access */}
        <div className="mt-12 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} MultiCraft. All Rights Reserved.</p>
          
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1">
              <span>Crafted with passion for art lovers</span>
              <Heart className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
            </p>
            {/* Discrete lock for Owner portal */}
            <button 
              onClick={onOpenAdminLogin}
              className="text-neutral-700 hover:text-neutral-400 p-1 rounded transition-colors cursor-pointer"
              title="Store Owner Portal (Password Protected)"
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
