import React from 'react';
import { Flame, Car, Gamepad2, Feather, Sparkles } from 'lucide-react';

const categories = [
  {
    id: "Motivational",
    title: "Motivational",
    tagline: "Dream • Plan • Do • Repeat",
    desc: "Mindset typography and modern ambition art for workspaces and bedrooms.",
    icon: Flame,
    color: "from-amber-500/20 to-orange-500/5",
    accent: "text-amber-400",
    border: "border-amber-500/30",
    sampleImg: "/products/art_2.jpg"
  },
  {
    id: "Automotive",
    title: "Automotive",
    tagline: "Speed • Precision • Legacy",
    desc: "Iconic supercars, JDM legends, and track monsters in high-res cinema lighting.",
    icon: Car,
    color: "from-red-500/20 to-rose-500/5",
    accent: "text-red-400",
    border: "border-red-500/30",
    sampleImg: "/products/art_1.jpg"
  },
  {
    id: "Gaming",
    title: "Gaming",
    tagline: "Level Up Your Sanctum",
    desc: "Cyberpunk visuals, neon glitched icons, and retro controllers for true gamers.",
    icon: Gamepad2,
    color: "from-cyan-500/20 to-purple-500/5",
    accent: "text-cyan-400",
    border: "border-cyan-500/30",
    sampleImg: "/products/art_4.jpg"
  },
  {
    id: "Urdu Poetry",
    title: "Urdu Poetry",
    tagline: "Allama Iqbal • Ghalib • Jaun Elia",
    desc: "Timeless poetic verses with intricate Nastaliq calligraphy and gold accents.",
    icon: Feather,
    color: "from-emerald-500/20 to-teal-500/5",
    accent: "text-emerald-400",
    border: "border-emerald-500/30",
    sampleImg: "/products/art_3.jpg"
  }
];

export default function CategoryGrid({ activeCategory, onSelectCategory }) {
  return (
    <section id="categories" className="py-16 bg-[#0c0c0c] border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Aesthetics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Explore By Category
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            Every frame is designed with a distinct mood to complement your space.
          </p>
        </div>

        {/* Categories 4-Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group cursor-pointer relative rounded-2xl overflow-hidden bg-[#141414] border transition-all duration-300 p-5 flex flex-col justify-between hover:scale-[1.02] ${
                  isSelected 
                    ? 'border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.25)] ring-1 ring-[#d4af37]' 
                    : 'border-[#262626] hover:border-[#444]'
                }`}
              >
                {/* Background Art Sneak Peek */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-black">
                  <img 
                    src={cat.sampleImg} 
                    alt={cat.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  
                  {/* Category Pill Icon */}
                  <div className="absolute top-3 left-3 bg-[#0a0a0a]/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-[#333] flex items-center gap-1.5">
                    <Icon className={`w-4 h-4 ${cat.accent}`} />
                    <span className="text-xs font-bold text-white">{cat.title}</span>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#d4af37] font-medium mt-0.5">
                    {cat.tagline}
                  </p>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                {/* Action button */}
                <div className="mt-4 pt-3 border-t border-[#222] flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-[#d4af37]' : 'text-neutral-400 group-hover:text-white'}>
                    {isSelected ? 'Currently Viewing' : 'View Designs'}
                  </span>
                  <span className="text-[#d4af37] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
