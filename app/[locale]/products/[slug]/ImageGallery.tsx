"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageGallery({ mainImage, gallery, productName }: { mainImage: string, gallery: string[], productName: string }) {
  const images = [mainImage, ...gallery].filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#e8e4db]">
      
      {/* Main Image with Crossfade */}
      <AnimatePresence initial={false}>
        <motion.img 
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${productName} view ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      
      {/* Thumbnails Sidebar - Overlaid literally inside the picture */}
      {images.length > 1 && (
        <div className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-10 bg-white/20 p-2 backdrop-blur-sm rounded-sm">
          {images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-14 h-16 bg-white p-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 cursor-pointer transition-all hover:scale-105 ${
                currentIndex === idx 
                  ? "opacity-100 grayscale-0 ring-1 ring-ink" 
                  : "opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
              }`}
            >
              <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}

      {/* Mobile Swipe Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex lg:hidden gap-2 z-10 bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-full">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                currentIndex === idx ? "bg-ink w-3" : "bg-ink/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
