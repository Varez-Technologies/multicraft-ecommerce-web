import React from 'react';
import { ArrowRight, Eye, ShieldCheck, Truck, Sparkles, Award } from 'lucide-react';
import { createWhatsAppCustomLink } from '../utils/whatsapp';

export default function Hero({ onExploreClick, onOpenWallPreview }) {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#1c1c1c]">
      {/* Background ambient gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#d4af37]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c180e] border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MultiCraft Signature Wall Decor</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Make Your Walls <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f3e5ab] to-[#d4af37]">
                Speak Your Vibe.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Premium handcrafted frames, motivational aesthetics, automotive passion, and timeless Urdu poetry. Museum-grade canvas engineered to elevate your living room, office, and gaming sanctum.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f24] hover:from-[#e5c148] hover:to-[#c69f2e] text-black font-bold tracking-wide shadow-[0_4px_25px_rgba(212,175,55,0.35)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={onOpenWallPreview}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#141414] hover:bg-[#1c1c1c] border border-[#333] hover:border-[#d4af37] text-white font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#d4af37]" />
                <span>Interactive Wall Preview</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-[#1c1c1c] grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl font-black text-white">100%</p>
                <p className="text-xs text-neutral-400 mt-0.5">Handcrafted Canvas</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">4.9★</p>
                <p className="text-xs text-neutral-400 mt-0.5">Customer Rating</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">COD</p>
                <p className="text-xs text-neutral-400 mt-0.5">Pay on Delivery</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Mockup */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Featured Showcase Frame */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Golden Glow Shadow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#d4af37]/40 to-[#aa8528]/20 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-1000" />

              {/* Framed Artwork Container */}
              <div className="relative rounded-2xl overflow-hidden bg-[#141414] border-4 border-[#d4af37] p-2 shadow-2xl">
                <img 
                  src="/products/art_1.jpg" 
                  alt="MultiCraft Hero Art" 
                  className="w-full h-[400px] sm:h-[460px] object-cover rounded-xl"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80";
                  }}
                />

                {/* Floating Overlay Badge on Artwork */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#0a0a0a]/85 backdrop-blur-md border border-[#333] p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37]">
                      Featured Masterpiece
                    </span>
                    <h3 className="text-sm font-bold text-white">Porsche 911 GT3 Track Neon</h3>
                    <p className="text-xs text-neutral-400">Available in A4, A3, A2, A1</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-neutral-500 line-through">Rs. 2,599</span>
                    <p className="text-base font-extrabold text-[#d4af37]">Rs. 1,999</p>
                  </div>
                </div>

              </div>

              {/* Decorative mini badge */}
              <div className="absolute -top-3 -right-3 bg-[#d4af37] text-black text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>Premium Pinewood</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
