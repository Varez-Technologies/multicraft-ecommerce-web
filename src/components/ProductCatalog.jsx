import React, { useState } from 'react';
import { Eye, ShoppingBag, Check, Sparkles, Filter } from 'lucide-react';
import { sizeOptions, frameOptions, categoriesList } from '../data/products';

export default function ProductCatalog({ 
  products, 
  activeCategory, 
  onSelectCategory, 
  onAddToCart, 
  onQuickBuy,
  onOpenWallWithProduct 
}) {
  const [selectedProduct, setSelectedProduct] = useState(null); // for customization modal
  const [activeSize, setActiveSize] = useState(sizeOptions[1]); // A3 default
  const [activeFrame, setActiveFrame] = useState(frameOptions[0]); // Black default

  // Filter products
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  const handleOpenCustomize = (prod) => {
    setSelectedProduct(prod);
    setActiveSize(sizeOptions[1]);
    setActiveFrame(frameOptions[0]);
  };

  const calculatePrice = (basePrice, size, frame) => {
    return basePrice + (size?.priceDelta || 0) + (frame?.priceDelta || 0);
  };

  return (
    <section id="catalog" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Artworks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Our Wall Art Collection
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              Select any design to customize your preferred size and frame finish.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categoriesList.map(cat => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'bg-[#141414] text-neutral-300 hover:text-white border border-[#2a2a2a] hover:border-[#444]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => {
            const previewPrice = prod.basePrice;

            return (
              <div 
                key={prod.id}
                className="group rounded-2xl bg-[#121212] border border-[#222] hover:border-[#d4af37]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-black overflow-hidden p-3 flex items-center justify-center">
                  
                  {/* Subtle inner frame mockup border */}
                  <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-[#333] shadow-inner group-hover:border-[#d4af37]/50 transition-colors">
                    <img 
                      src={prod.image} 
                      alt={prod.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                  </div>

                  {/* Badge */}
                  {prod.badge && (
                    <span className="absolute top-5 left-5 bg-[#0a0a0a]/90 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/40 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      {prod.badge}
                    </span>
                  )}

                  {/* Quick Action: View on Wall Button */}
                  <button 
                    onClick={() => onOpenWallWithProduct(prod)}
                    className="absolute top-5 right-5 p-2 rounded-xl bg-black/75 hover:bg-[#d4af37] text-white hover:text-black border border-[#333] transition-all duration-200 opacity-90 group-hover:opacity-100 shadow"
                    title="Preview on Living Room Wall"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Quick Customize Button Overlay on Hover */}
                  <div className="absolute inset-x-5 bottom-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                    <button 
                      onClick={() => handleOpenCustomize(prod)}
                      className="w-full py-2.5 rounded-xl bg-[#d4af37] text-black font-bold text-xs shadow-lg hover:bg-[#e6c148] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Choose Size & Frame</span>
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-[#d4af37] uppercase tracking-wider">
                      {prod.category}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1 line-clamp-1 group-hover:text-[#d4af37] transition-colors">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-4 pt-3 border-t border-[#222] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase">Starting at</span>
                      <p className="text-base font-extrabold text-[#d4af37]">
                        Rs. {previewPrice.toLocaleString()}
                      </p>
                    </div>

                    <button 
                      onClick={() => handleOpenCustomize(prod)}
                      className="px-3 py-1.5 rounded-lg bg-[#1c1c1c] hover:bg-[#d4af37] text-white hover:text-black border border-[#333] hover:border-transparent text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* ================= CUSTOMIZATION POPUP MODAL ================= */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#121212] border border-[#333] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 rounded-full bg-[#1c1c1c] border border-[#2a2a2a]"
            >
              ✕
            </button>

            <div className="grid sm:grid-cols-2 gap-6 items-center">
              
              {/* Product Visual with Active Frame Style */}
              <div className="flex flex-col items-center">
                <div className={`relative w-full aspect-[4/5] rounded-xl overflow-hidden transition-all duration-300 p-2 bg-[#1a1a1a] ${activeFrame.borderStyle}`}>
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover rounded" 
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 rounded text-[11px] text-[#d4af37] font-semibold border border-[#333]">
                    {activeSize.label}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const prodToPreview = selectedProduct;
                    setSelectedProduct(null);
                    onOpenWallWithProduct(prodToPreview);
                  }}
                  className="mt-3 text-xs text-[#d4af37] hover:underline flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview this frame in living room</span>
                </button>
              </div>

              {/* Customization Options */}
              <div className="space-y-5">
                <div>
                  <span className="text-xs uppercase font-bold text-[#d4af37]">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-white">
                    {selectedProduct.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Museum grade canvas with UV & fade resistant finish.
                  </p>
                </div>

                {/* 1. Size Selection */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-2 uppercase tracking-wide">
                    1. Choose Canvas Size
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {sizeOptions.map(sz => (
                      <button
                        key={sz.id}
                        onClick={() => setActiveSize(sz)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          activeSize.id === sz.id 
                            ? 'border-[#d4af37] bg-[#221f14] text-white shadow' 
                            : 'border-[#262626] bg-[#161616] text-neutral-300 hover:border-[#444]'
                        }`}
                      >
                        <div className="font-bold">{sz.label}</div>
                        <div className="text-[10px] text-neutral-400 flex items-center justify-between mt-1">
                          <span>{sz.tag}</span>
                          <span className="text-[#d4af37]">
                            {sz.priceDelta === 0 ? "Base" : `+Rs. ${sz.priceDelta}`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Frame Color & Style */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-2 uppercase tracking-wide">
                    2. Choose Frame Finish
                  </label>
                  <div className="space-y-2">
                    {frameOptions.map(fr => (
                      <button
                        key={fr.id}
                        onClick={() => setActiveFrame(fr)}
                        className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                          activeFrame.id === fr.id 
                            ? 'border-[#d4af37] bg-[#221f14] text-white' 
                            : 'border-[#262626] bg-[#161616] text-neutral-300 hover:border-[#444]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span 
                            className="w-4 h-4 rounded-full border border-neutral-600 shadow-sm" 
                            style={{ backgroundColor: fr.color }} 
                          />
                          <span className="font-semibold">{fr.name}</span>
                        </div>
                        <span className="text-[#d4af37] font-bold">
                          {fr.priceDelta === 0 ? 'Included' : `+Rs. ${fr.priceDelta}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total Calculation & Buttons */}
                <div className="pt-4 border-t border-[#262626]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-neutral-400">Total Price (COD):</span>
                    <span className="text-2xl font-black text-[#d4af37]">
                      Rs. {calculatePrice(selectedProduct.basePrice, activeSize, activeFrame).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => {
                        const calculated = calculatePrice(selectedProduct.basePrice, activeSize, activeFrame);
                        onAddToCart(selectedProduct, activeSize, activeFrame, calculated);
                        setSelectedProduct(null);
                      }}
                      className="py-3 rounded-xl bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white border border-[#333] hover:border-[#d4af37] font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                      <span>Add to Cart</span>
                    </button>

                    <button 
                      onClick={() => {
                        const calculated = calculatePrice(selectedProduct.basePrice, activeSize, activeFrame);
                        onQuickBuy(selectedProduct, activeSize, activeFrame, calculated);
                        setSelectedProduct(null);
                      }}
                      className="py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f24] hover:from-[#e5c148] hover:to-[#c69f2e] text-black font-extrabold text-xs transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Buy Now (COD)</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
