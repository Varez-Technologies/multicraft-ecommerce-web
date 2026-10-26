import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Move, Sparkles, Layers, RotateCcw } from 'lucide-react';
import { sizeOptions, frameOptions } from '../data/products';

export default function WallPreviewModal({ isOpen, onClose, product, allProducts }) {
  if (!isOpen) return null;

  // Selected product to preview
  const [currentProduct, setCurrentProduct] = useState(product || allProducts[0]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[1]); // A3
  const [selectedFrame, setSelectedFrame] = useState(frameOptions[0]); // Black
  const [wallColor, setWallColor] = useState('#222222'); // Neutral dark living room wall
  const [wallTexture, setWallTexture] = useState('modern'); // modern, brick, warm
  const [frameScale, setFrameScale] = useState(1); // Zoom scale

  // Compute frame dimension based on size selection
  const sizeScaleMap = {
    'a4': 'w-36 h-48 sm:w-44 sm:h-60',
    'a3': 'w-48 h-64 sm:w-56 sm:h-76',
    'a2': 'w-60 h-80 sm:w-72 sm:h-96',
    'a1': 'w-72 h-96 sm:w-88 sm:h-[430px]'
  };

  const currentSizeClass = sizeScaleMap[selectedSize.id] || sizeScaleMap['a3'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#121212] border border-[#333] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Top Modal Bar */}
        <div className="px-6 py-4 bg-[#181818] border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              MultiCraft Living Room Wall Visualizer
            </h3>
            <span className="hidden sm:inline text-xs text-neutral-400">
              (Test artwork scale on real living room wall)
            </span>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#222] hover:bg-[#333] text-neutral-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Room Area */}
        <div 
          className="relative flex-1 min-h-[380px] sm:min-h-[480px] flex items-center justify-center overflow-hidden transition-colors duration-500"
          style={{ backgroundColor: wallColor }}
        >
          {/* Subtle Room Lighting Effect */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          
          {/* Floor / Baseboard at Bottom */}
          <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-t from-[#0e0e0e] to-[#1a1a1a] border-t-4 border-[#2c2c2c] flex items-end justify-center pb-2">
            <span className="text-[11px] text-neutral-500 tracking-wider uppercase font-medium">
              Hardwood Floor / Media Console Level
            </span>
          </div>

          {/* Plant / Decor in Corner for Scale Reference */}
          <div className="absolute bottom-6 left-6 hidden md:block opacity-60 pointer-events-none">
            <div className="w-16 h-36 bg-neutral-800/80 rounded-t-full border border-neutral-700/50 flex items-center justify-center text-[10px] text-neutral-500 text-center px-1">
              Indoor Plant (Scale Reference)
            </div>
          </div>

          {/* Sofa Mockup Silhouette for Scale */}
          <div className="absolute bottom-10 right-10 hidden lg:block opacity-40 pointer-events-none">
            <div className="w-48 h-20 bg-neutral-800 rounded-t-xl border border-neutral-700 text-center pt-2 text-[10px] text-neutral-500">
              Lounge Sofa
            </div>
          </div>

          {/* THE FRAMED ARTWORK ON THE WALL */}
          <div 
            className={`relative transition-all duration-300 ${currentSizeClass} ${selectedFrame.borderStyle} rounded-sm shadow-[0_25px_50px_rgba(0,0,0,0.85)] z-20 flex items-center justify-center p-1 bg-black`}
            style={{ transform: `scale(${frameScale})` }}
          >
            {/* Hanging Wire Shadow */}
            <div className="absolute -top-6 inset-x-1/2 -translate-x-1/2 w-8 h-6 border-b border-l border-neutral-600/40 rotate-45 pointer-events-none" />

            {/* Artwork Image */}
            <img 
              src={currentProduct.image} 
              alt={currentProduct.title}
              className="w-full h-full object-cover" 
            />

            {/* Scale & Dimensions Floating Tag */}
            <div className="absolute -bottom-8 bg-black/85 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-bold text-[#d4af37] border border-[#333] whitespace-nowrap shadow">
              {selectedSize.label} • {selectedFrame.name}
            </div>
          </div>

          {/* Scale Control Tools (Bottom Right of Room) */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-[#333] p-1.5 rounded-xl flex items-center gap-1 z-30">
            <button 
              onClick={() => setFrameScale(prev => Math.max(0.7, prev - 0.1))}
              className="p-1.5 hover:bg-[#222] rounded text-neutral-300 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs text-neutral-400 px-1">{Math.round(frameScale * 100)}%</span>
            <button 
              onClick={() => setFrameScale(prev => Math.min(1.4, prev + 0.1))}
              className="p-1.5 hover:bg-[#222] rounded text-neutral-300 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setFrameScale(1)}
              className="p-1.5 hover:bg-[#222] rounded text-neutral-300 hover:text-white ml-1 border-l border-[#333]"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Interactive Control Panel */}
        <div className="p-4 sm:p-6 bg-[#141414] border-t border-[#262626] grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
          
          {/* 1. Artwork Selector */}
          <div>
            <label className="text-[11px] font-bold uppercase text-neutral-400 block mb-1">
              Select Artwork
            </label>
            <select 
              value={currentProduct.id}
              onChange={(e) => {
                const found = allProducts.find(p => p.id === parseInt(e.target.value));
                if (found) setCurrentProduct(found);
              }}
              className="w-full bg-[#1e1e1e] border border-[#333] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            >
              {allProducts.map(p => (
                <option key={p.id} value={p.id}>{p.title} ({p.category})</option>
              ))}
            </select>
          </div>

          {/* 2. Size Comparison */}
          <div>
            <label className="text-[11px] font-bold uppercase text-neutral-400 block mb-1">
              Canvas Size
            </label>
            <div className="grid grid-cols-4 gap-1">
              {sizeOptions.map(sz => (
                <button
                  key={sz.id}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-1.5 text-[11px] rounded font-bold border transition-all ${
                    selectedSize.id === sz.id 
                      ? 'bg-[#d4af37] text-black border-[#d4af37]' 
                      : 'bg-[#1e1e1e] text-neutral-300 border-[#333]'
                  }`}
                >
                  {sz.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Frame Finish */}
          <div>
            <label className="text-[11px] font-bold uppercase text-neutral-400 block mb-1">
              Frame Finish
            </label>
            <div className="flex gap-2">
              {frameOptions.map(fr => (
                <button
                  key={fr.id}
                  onClick={() => setSelectedFrame(fr)}
                  className={`flex-1 py-1.5 px-1 text-[11px] rounded font-bold border truncate transition-all ${
                    selectedFrame.id === fr.id 
                      ? 'bg-[#221f14] text-[#d4af37] border-[#d4af37]' 
                      : 'bg-[#1e1e1e] text-neutral-300 border-[#333]'
                  }`}
                >
                  {fr.id === 'black' ? 'Black' : fr.id === 'gold' ? 'Gold' : 'Frameless'}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Wall Paint Mood */}
          <div>
            <label className="text-[11px] font-bold uppercase text-neutral-400 block mb-1">
              Wall Paint Color
            </label>
            <div className="flex items-center gap-2">
              {[
                { name: 'Dark Slate', hex: '#1c1c1c' },
                { name: 'Navy Blue', hex: '#1a2332' },
                { name: 'Forest Green', hex: '#1b2921' },
                { name: 'Warm Cream', hex: '#d9d2c5' },
                { name: 'Soft Gray', hex: '#777777' }
              ].map(c => (
                <button
                  key={c.hex}
                  onClick={() => setWallColor(c.hex)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    wallColor === c.hex ? 'border-[#d4af37] scale-110' : 'border-neutral-600'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
