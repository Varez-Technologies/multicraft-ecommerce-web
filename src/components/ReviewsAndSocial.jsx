import React from 'react';
import { Star, Heart, Sparkles, Share2 } from 'lucide-react';
import { createWhatsAppCustomLink } from '../utils/whatsapp';

const reviews = [
  {
    name: "Zainab Malik",
    city: "Lahore",
    rating: 5,
    text: "Ordered the Faiz Ahmed Faiz Urdu poetry canvas in A2 size with metallic gold frame. The quality blew my mind! Safe wooden packing arrived without a single scratch.",
    artPurchased: "Faiz Ahmed Faiz - A2 Gold Frame"
  },
  {
    name: "Hamza Sheikh",
    city: "Karachi (DHA)",
    rating: 5,
    text: "The Porsche 911 track art completely transformed my gaming setup wall. The deep blacks and neon lines look 10x better in real life than on screen.",
    artPurchased: "Porsche 911 GT3 - A3 Black Frame"
  },
  {
    name: "Dr. Bilal Arshad",
    city: "Islamabad",
    rating: 5,
    text: "Ordered 3 motivational frames for my clinic office. Exceptional craftsmanship and delivered within 3 days via COD. MultiCraft is top tier.",
    artPurchased: "Motivational Trio - A3 Frames"
  }
];

export default function ReviewsAndSocial() {
  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Living Room Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Loved Across Pakistan
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            Real feedback from art lovers, gamers, and modern homeowners.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {reviews.map((rev, i) => (
            <div 
              key={i}
              className="p-6 rounded-2xl bg-[#141414] border border-[#262626] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#d4af37] mb-3">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-[#d4af37]" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#222] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                  <span className="text-[10px] text-neutral-500">{rev.city}</span>
                </div>
                <span className="text-[10px] bg-[#1f1a0e] text-[#d4af37] px-2 py-0.5 rounded border border-[#d4af37]/30">
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram / Social Gallery Section (As seen in brand sheet) */}
        <div className="rounded-3xl bg-[#111] border border-[#222] p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>@multicraft</span>
                  <span className="text-[10px] bg-[#222] text-[#d4af37] px-2 py-0.5 rounded font-mono">
                    Community
                  </span>
                </h3>
                <p className="text-xs text-neutral-400">Tag us in your setup to be featured</p>
              </div>
            </div>

            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-bold text-[#d4af37] hover:underline"
            >
              Follow MultiCraft on Instagram →
            </a>
          </div>

          {/* 4 Social Art Thumbnails */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['art_1.jpg', 'art_2.jpg', 'art_3.jpg', 'art_4.jpg'].map((img, idx) => (
              <div 
                key={idx}
                className="relative aspect-square rounded-xl overflow-hidden group bg-black border border-[#262626]"
              >
                <img 
                  src={`/products/${img}`} 
                  alt="Social showcase" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>MultiCraft Setup</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
