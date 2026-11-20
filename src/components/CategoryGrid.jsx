import React from 'react';
import { Flame, Car, Gamepad2, Feather, Moon, Palette, Sparkles } from 'lucide-react';

const categories = [
  {
    id: "Automotive",
    title: "Automotive",
    tagline: "Speed • Precision • Legacy",
    desc: "Iconic supercars, JDM legends, and track monsters in high-res cinema lighting.",
    icon: Car,
    color: "from-red-500/20 to-rose-500/5",
    accent: "text-red-400",
    border: "border-red-500/30",
    sampleImg: "/products/automotive_cayman_set_of_3.jpeg"
  },
  {
    id: "Islamic",
    title: "Islamic Calligraphy",
    tagline: "Ayat • Sacred • Barakah",
    desc: "Spiritual Quranic verses and royal Islamic typography with gold textured finishes.",
    icon: Moon,
    color: "from-emerald-500/20 to-teal-500/5",
    accent: "text-emerald-400",
    border: "border-emerald-500/30",
    sampleImg: "/products/islamic_tawakkal_sabr_shukr_set_of_3.jpeg"
  },
  {
    id: "Motivational",
    title: "Motivational",
    tagline: "Dream • Plan • Do • Repeat",
    desc: "Mindset typography and modern ambition art for workspaces and bedrooms.",
    icon: Flame,
    color: "from-amber-500/20 to-orange-500/5",
    accent: "text-amber-400",
    border: "border-amber-500/30",
    sampleImg: "/products/motivational_discipline.jpeg"
  },
  {
    id: "Gaming",
    title: "Gaming & Battlestations",
    tagline: "Level Up Your Sanctum",
    desc: "Cyberpunk visuals, neon glitched icons, and trading charts for modern setups.",
    icon: Gamepad2,
    color: "from-cyan-500/20 to-purple-500/5",
    accent: "text-cyan-400",
    border: "border-cyan-500/30",
    sampleImg: "/products/gaming_cinematic_black_gold.png"
  },
  {
    id: "Calligraphy",
    title: "Modern Calligraphy",
    tagline: "Abstract • Strokes • Elegance",
    desc: "Contemporary abstract strokes and minimalist art crafted for luxurious modern spaces.",
    icon: Palette,
    color: "from-purple-500/20 to-pink-500/5",
    accent: "text-purple-400",
    border: "border-purple-500/30",
    sampleImg: "/products/calligraphy_abstract_art.jpeg"
  },
  {
    id: "Urdu Poetry",
    title: "Urdu Poetry",
    tagline: "Timeless Verses & Soul",
    desc: "Poetic verses with intricate Nastaliq calligraphy and gold accents.",
    icon: Feather,
    color: "from-yellow-500/20 to-amber-500/5",
    accent: "text-yellow-400",
    border: "border-yellow-500/30",
    sampleImg: "/products/urdu_poetry_illuminated_floral.png"
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

        {/* Categories 6-Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    ? 'border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.25)] ring-1 ring-[#d4af37]' 
                    : `${cat.border} hover:border-[#d4af37]/60 hover:shadow-xl`
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-40 group-hover:opacity-70 transition-opacity`} />
                
                {/* Top Row: Icon + Sample Image preview */}
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-[#1c1c1c] border border-white/10 flex items-center justify-center ${cat.accent} shadow`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Miniature frame preview */}
                  <div className="w-14 h-16 rounded-lg overflow-hidden border border-[#333] shadow-md transform rotate-3 group-hover:rotate-0 transition-transform">
                    <img 
                      src={cat.sampleImg} 
                      alt={cat.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="relative z-10 mt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    {cat.tagline}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                    <span>{cat.title}</span>
                    <span className="text-xs text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">
                      View →
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                {/* Active Indicator Pill */}
                {isSelected && (
                  <div className="relative z-10 mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                    <span>Currently viewing</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
