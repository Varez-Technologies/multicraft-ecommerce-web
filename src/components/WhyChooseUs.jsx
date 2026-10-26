import React from 'react';
import { Truck, ShieldCheck, Award, RefreshCw, Send, Sparkles } from 'lucide-react';
import { createWhatsAppCustomLink } from '../utils/whatsapp';

export default function WhyChooseUs() {
  const perks = [
    {
      icon: Award,
      title: "Museum Grade Canvas",
      desc: "380 GSM textured cotton canvas paired with Japanese fade-resistant archival pigment inks."
    },
    {
      icon: ShieldCheck,
      title: "Handcrafted Pinewood",
      desc: "Solid kiln-dried wooden frames with precision cut corners, ready to hang straight from the box."
    },
    {
      icon: Truck,
      title: "Safe Crate Packaging",
      desc: "Reinforced corner protectors with bubble cushion & wooden outer crate guarantee 0% transit damage."
    },
    {
      icon: RefreshCw,
      title: "Cash on Delivery",
      desc: "Inspect your package at your doorstep before payment across all cities of Pakistan."
    }
  ];

  return (
    <section className="py-20 bg-[#0e0e0e] border-y border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The MultiCraft Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            More Than Just Frames
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            We merge artisanal woodworking with fine art print engineering to create lasting centerpieces.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#141414] border border-[#222] hover:border-[#d4af37]/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1c180e] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#d4af37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Custom Order Callout Box */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#18140c] via-[#1c1c1c] to-[#18140c] border border-[#d4af37]/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
              Bespoke Service
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Have a Custom Artwork or Family Photo?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              Send us your high-res photos, personal calligraphy requests, or custom car shots on WhatsApp. Our design studio will generate a 3D digital mockup for free.
            </p>
          </div>

          <a 
            href={createWhatsAppCustomLink()}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-8 py-4 rounded-xl bg-[#d4af37] hover:bg-[#e6c148] text-black font-extrabold text-xs tracking-wider shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Consult on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
